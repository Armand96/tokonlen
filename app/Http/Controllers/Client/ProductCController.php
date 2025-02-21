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

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }
        // filter by category_id
        if ($req->has('category_id')) {
            $query->where('category_id', '=', $req->category_id);
        }

        $query->where('is_active', true);
        $categories = $query->get();
        return response()->json(new ResponseSuccess($categories, "Success", "Success Get Products"));
    }

    public function getOneActiveProductWithProducts(Product $product)
    {
        if($product) return response()->json(new ResponseSuccess($product->with(['images', 'variant.images', 'links'])->first(), "Success", "Success Get Product"));
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }
}
