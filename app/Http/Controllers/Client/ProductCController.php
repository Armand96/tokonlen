<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        }

        $query->where('is_active', true)->with(['image', 'discount', 'variant.image', 'variant.discount', 'category.parentCat'])->orderBy($orderBy, $orderMethod);
        $products = $query->paginate($data_per_page);
        // dd(DB::getQueryLog());
        return $products;
        // return response()->json(new ResponseSuccess($products, "Success", "Success Get Products"));
    }

    public function getOneActiveProductWithProducts(Product $product)
    {
        if ($product) return response()->json(
            new ResponseSuccess(
                $product->with(['images', 'variant.images', 'links', 'discount', 'category'])
                    ->where('is_active', true)->where('id', $product->id)->first(),
                "Success",
                "Success Get Product"
            )
        );
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }

    public function getDistinctSize(Product $product)
    {
        $query = Variant::query();
        $sizes = $query->where('product_id', $product->id)->where('is_active', true)->distinct()->get('size');
        return response()->json(new ResponseSuccess($sizes, "Success", "Success Get Distinct Sizes"));
    }
}
