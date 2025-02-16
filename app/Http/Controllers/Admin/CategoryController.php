<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Category\CategoryCreateRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Category::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }

        // paginate result
        $categories = $query->paginate($dataPerPage);

        return $categories;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryCreateRequest $createCategory)
    {
        try {
            if ($createCategory->hasFile('image_file')) {
                $imageName = time() . '.' . $createCategory->image_file->extension();
                $createCategory->image_file->storeAs('public/categories/', $imageName);
                $createCategory->image = $imageName;
            } else {
                $createCategory->image = '';
            }
            $category = Category::create($createCategory);
            return response()->json(new ResponseSuccess($category,"Success", "Success Create Category"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json(new ResponseSuccess($category, "Success", "Success Get Category"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $updateCategory, Category $category)
    {
        try {
            if ($updateCategory->hasFile('image_file')) {

                $isExist = Storage::disk('public')->exists("category/$category->image") ?? false;
                if ($isExist) Storage::delete("public/category/$category->image");

                $imageName = time() . '.' . $updateCategory->image_file->extension();
                $updateCategory->image_file->storeAs('public/categories/', $imageName);
                $updateCategory->image = $imageName;
            }
            $updateCategory->update($updateCategory);
            return response()->json(new ResponseSuccess($updateCategory,"Success", "Success Update Category"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($category,"Success", "Success Set Category To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
