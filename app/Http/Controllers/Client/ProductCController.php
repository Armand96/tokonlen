<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Product;
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

        $query->where('is_active', true)->with(['image', 'discount', 'variant.images'])->orderBy($orderBy, $orderMethod);
        $products = $query->paginate($data_per_page);
        // dd(DB::getQueryLog());
        return $products;
        // return response()->json(new ResponseSuccess($products, "Success", "Success Get Products"));
    }

    public function getOneActiveProductWithProducts(Product $product)
    {
        if ($product) return response()->json(
            new ResponseSuccess(
                $product->with(['images', 'variant.images', 'links', 'discount'])
                    ->where('is_active', true)->where('id', $product->id)->first(),
                "Success",
                "Success Get Product"
            )
        );
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }
}
