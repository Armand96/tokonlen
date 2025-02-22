<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductCController extends Controller
{
    public function getListActiveProduct(Request $req)
    {
        $query = Product::query();
        $data_per_page = $req->input('data_per_page') ? $req->input('data_per_page') : 10;

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }
        // filter by category_id
        if ($req->has('category_id')) {
            $query->where('category_id', '=', $req->category_id);
        }

        $query->where('is_active', true)->with('image');
        $products = $query->paginate($data_per_page);
        return $products;
        // return response()->json(new ResponseSuccess($products, "Success", "Success Get Products"));
    }

    public function getOneActiveProductWithProducts(Product $product)
    {
        if ($product) return response()->json(
            new ResponseSuccess(
                $product->with(['images', 'variant.images', 'links'])
                    ->where('is_active', true)->where('id', $product->id)->first(),
                "Success",
                "Success Get Product"
            )
        );
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }
}
