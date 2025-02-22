<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseSuccess;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $words = $request->input('words') ? $request->input('words') : "";
        if($words != "") {
            $categories = Category::where('name', 'like', '%'.$words.'%')->get();
            $products = Product::where('name', 'like', '%'.$words.'%')->with(['image'])->get();
            $data = array(
                'categories' => $categories,
                'products' => $products
            );
            return response()->json(new ResponseSuccess($data, "Success", "Products or Category found"));
        }

        return response()->json(new ResponseSuccess((object) null, "Success", "No category or product found"));
    }
}
