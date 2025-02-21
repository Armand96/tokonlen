<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryCController extends Controller
{
    public function getListActiveCategory(Request $req)
    {
        $query = Category::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }

        $query->where('parent_id', null)->where('is_active', true)->with('subCat');
        $categories = $query->get();
        return response()->json(new ResponseSuccess($categories, "Success", "Success Get Categories"));
    }

    public function getOneActiveCategoryWithProducts(Category $category)
    {
        // $category = Category::where('is_active', true)->with('subCat')->get();
        if($category) {
            $category->with('subCat');
            if($category->isLeaf()) {
                $category->with('product');
            }
            $category->first();
            return response()->json(new ResponseSuccess($category, "Success", "Success Get Categorie"));
        }
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }


}
