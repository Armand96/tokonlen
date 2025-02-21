<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Category\CategoryCreateReq;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryUpdateReq;
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

        $query->where('parent_id', null)->with('subCat');

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
    public function store(CategoryCreateReq $createCategory)
    {
        $imageName = "";
        try {
            $validatedData = $createCategory->validated();

            if ($createCategory->hasFile('image_file')) {
                $imageName = time() . '.' . $createCategory->file('image_file')->extension();
                $createCategory->file('image_file')->storeAs('public/categories/', $imageName);
                $validatedData['image'] = $imageName;
            } else {
                $validatedData['image'] = '';
            }
            $category = Category::create($validatedData);
            return response()->json(new ResponseSuccess($category,"Success","Success Create Category"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            $isExist = Storage::disk('public')->exists("categories/$imageName") ?? false;
            if ($isExist) Storage::delete("public/categories/$imageName");
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json(new ResponseSuccess($category->where('id', $category->id)->with('subCat')->first(), "Success", "Success Get Category"));
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
    public function update(CategoryUpdateReq $updateCategory, Category $category)
    {
        $imageName = "";
        try {
            $validatedData = $updateCategory->validated();

            if ($updateCategory->hasFile('image_file')) {

                $isExist = Storage::disk('public')->exists("categories/$category->image") ?? false;
                if ($isExist) Storage::delete("public/categories/$category->image");

                $imageName = time() . '.' . $updateCategory->file('image_file')->extension();
                $updateCategory->file('image_file')->storeAs('public/categories/', $imageName);
                $validatedData['image'] = $imageName;
            }
            $category->update($validatedData);
            return response()->json(new ResponseSuccess($category,"Success", "Success Update Category"));
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
