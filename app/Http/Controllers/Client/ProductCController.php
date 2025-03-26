<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientSide\LinkVisitCreate;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Product;
use App\Models\ProductLinkVisit;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductCController extends Controller
{
    public function getListActiveProduct(Request $req)
    {
        // DB::enableQueryLog();
        $query = Product::query();
        $orderBy = $req->input('order_by') ? $req->input('order_by') : 'release_date';
        $orderMethod = $req->input('order_method') ? $req->input('order_method') : 'desc';
        $data_per_page = $req->input('data_per_page') ? $req->input('data_per_page') : 10;

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }
        // filter by category_id
        if ($req->has('category_id')) {
            $query->where('category_id', '=', $req->category_id);
            // ->orWhereHas('category', function($q) use($req) {
            //     $q->where('parent_id', $req->category_id);
            // });
        }
        // filter by parent_category_id
        if ($req->has('parent_category_id')) {
            $query->whereHas('category', function ($qry) use ($req) {
                $qry->where('parent_id', $req->parent_category_id);
            });
        }
        // filter by size
        if ($req->has('size')) {
            $query->whereHas('variant', function ($qry) use ($req) {
                $qry->where('size', '=', $req->size);
            });
        }
        // filter by brand
        if ($req->has('brand')) {
            $query->where('brand', '=', $req->brand);
        }
        // filter by brand
        if ($req->has('brand_in')) {
            $data = explode(",", $req->brand_in);
            $query->whereIn('brand', $data);
        }
        // filter by brand
        if ($req->has('has_stock')) {
            $query->where('stock', '>', 0);
        }


        $query->where('is_active', true)->with(['image', 'discount', 'variant.images', 'variant.discount', 'category.parentCat', 'category.subCat', 'links.linkType']);
        $query->with('variant', function ($query) {
            $query->where('is_active', true);
        });

        if ($orderBy == "discount") {
            $query->orderByRaw(
                "(SELECT COALESCE(discount_percentage, discount_amount, 0)
                FROM discounts
                WHERE discounts.product_id = products.id
                AND start_date <= NOW()
                AND end_date >= NOW()
                LIMIT 1) $orderMethod"
            );
        } else {
            $query->orderBy($orderBy, $orderMethod);
        }

        $products = $query->paginate($data_per_page);

        collect($products->items())->transform(function ($product) {
            $groupedVariants = $product->variant->groupBy('variant')->map(function ($sizes, $variantName) {
                return [
                    'name' => $variantName,
                    'sizes' => $sizes->map(function ($size) {
                        return [
                            'size' => $size->size,
                            'additional_price' => $size->additional_price,
                            'stock' => $size->stock,
                            'discount' => $size->discount,
                            'image' =>$size->image,
                            'is_active' => $size->is_active,
                            'final_price'=>$size->final_price,
                            'discount_price'=>$size->discount_price
                        ];
                    })->values()
                ];
            })->values();

            $product->variants = $groupedVariants;
            unset($product->variant);
            return $product;
        });
        // dd(DB::getQueryLog());
        return $products;
        // return response()->json(new ResponseSuccess($products, "Success", "Success Get Products"));
    }

    public function getOneActiveProductWithProducts(Product $product)
    {
        // DB::enableQueryLog();
        if ($product) {
            $product = Product::with(['images', 'variant.images', 'links.linkType', 'discount', 'category.parentCat', 'category.subCat', 'variant' => function($q) {
                $q->where('is_active', true);
            }])->where('is_active', true)->where('id', $product->id)->first();

            $groupedVariants = $product->variant->groupBy('variant')->map(function ($sizes, $variantName) {
                return [
                    'name' => $variantName,
                    'sizes' => $sizes->map(function ($size) {
                        return [
                            'size' => $size->size,
                            'additional_price' => $size->additional_price,
                            'stock' => $size->stock,
                            'discount' => $size->discount,
                            'images' =>$size->images,
                            'is_active' => $size->is_active,
                            'final_price'=>$size->final_price,
                            'discount_price'=>$size->discount_price
                        ];
                    })->values()
                ];
            })->values();

            $product->variants = $groupedVariants;
            unset($product->variant);

            // dd(DB::getQueryLog());
            return response()->json(
                new ResponseSuccess(
                    $product,
                    "Success",
                    "Success Get Product"
                )
            );
        }
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }

    public function getDistinctSize(Product $product)
    {
        $query = Variant::query();
        $sizes = $query->where('product_id', $product->id)->where('is_active', true)->distinct()->get('size');
        return response()->json(new ResponseSuccess($sizes, "Success", "Success Get Distinct Sizes"));
    }

    public function getDistinctBrand()
    {
        $brands = [];
        $datas = Product::distinct('brand')->get('brand');
        foreach ($datas as $key => $value) {
            array_push($brands, $value->brand);
        }
        return response()->json(new ResponseSuccess($brands, "Success", "Success Get Distinct Brands"));
    }

    public function counterLinkVisit(LinkVisitCreate $linkVisitCreate)
    {
        try {
            DB::beginTransaction();
            $validatedReq = $linkVisitCreate->validated();

            //validasi data existing
            $linkVisit = ProductLinkVisit::where('product_link_id', $validatedReq['product_link_id'])
                                            ->where('ip_address', $validatedReq['ip_address'])
                                            ->where('user_agent', $validatedReq['user_agent'])->first();

            if($linkVisit) {
                return response()->json(new ResponseFail((object) null, "Server Error", "Data sudah ada"), 400);
            }

            $linkVisit = ProductLinkVisit::create($validatedReq);
            $product = Product::find($linkVisitCreate['product_id']);
            $product->increment('visited');

            DB::commit();
            return response()->json(new ResponseSuccess($linkVisit, "Success", "Success insert increment visit"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null, "Server Error", $th->getMessage()), 500);
        }
    }
}
