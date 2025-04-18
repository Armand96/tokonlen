<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Category\CategoryCreateReq;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Category;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        // filter by is_active
        if ($req->has('is_active')) {
            $query->where('is_active', '=', $req->is_active);
        }
        // filter by is_show_header
        if ($req->has('is_show_header')) {
            $query->where('is_show_header', '=', $req->is_show_header);
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
        $path = "";
        try {
            $validatedData = $createCategory->validated();

            // $isMaxShow = Category::where('is_show_header', true)->count();
            // if ($isMaxShow >= 4) {
            //     return response()->json(new ResponseFail((object) null, "Bad Request", "Kategori yang ditampilkan di depan sudah maksimal, mohon untuk mengurangi kategori yang ditampilkan terleih dahulu"), 400);
            // }

            if ($createCategory->hasFile('image_file')) {
                $imageName = time() . '.' . $createCategory->file('image_file')->extension();
                $path = $createCategory->file('image_file')->storeAs('categories', $imageName, 'public');
                $validatedData['image'] = $path;
            } else {
                $validatedData['image'] = '';
            }
            $category = Category::create($validatedData);
            return response()->json(new ResponseSuccess($category, "Success", "Success Create Category"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            $isExist = Storage::disk('public')->exists($path) ?? false;
            if ($isExist) Storage::disk('public')->delete($path);
            return response()->json(new ResponseFail((object) null, "Server Error", $th->getMessage()), 500);
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
        $path = "";
        try {
            DB::beginTransaction();
            $validatedData = $updateCategory->validated();

            // dd($validatedData);
            $updatedProduct = [
                'is_active' => $validatedData['is_active']
            ];
            $childCategoryIds = Category::where('parent_id', $category->id)->pluck('id')->toArray();
            Category::where('parent_id', $category->id)->update($updatedProduct);

            // dd($childCategory);
            $productIds = Product::where('category_id', $category->id)->orWhereIn('category_id', $childCategoryIds)->pluck('id')->toArray();
            Product::where('category_id', $category->id)->orWhereIn('category_id', $childCategoryIds)->update($updatedProduct);
            Variant::whereIn('product_id', $productIds)->update($updatedProduct);

            // $isMaxShow = Category::where('is_show_header', true)->count();
            // if ($isMaxShow >= 4) {
            //     return response()->json(new ResponseFail((object) null, "Bad Request", "Kategori yang ditampilkan di depan sudah maksimal, mohon untuk mengurangi kategori yang ditampilkan terleih dahulu"), 400);
            // }

            if ($updateCategory->hasFile('image_file')) {

                $isExist = Storage::disk('public')->exists($category->image) ?? false;
                if ($isExist) Storage::disk('public')->delete($category->image);

                $imageName = time() . '.' . $updateCategory->file('image_file')->extension();
                $path = $updateCategory->file('image_file')->storeAs('categories', $imageName, 'public');
                $validatedData['image'] = $path;
            }
            $category->update($validatedData);
            DB::commit();
            return response()->json(new ResponseSuccess($category, "Success", "Success Update Category"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null, "Error", $th->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($category, "Success", "Success Set Category To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null, "Error", $th->getMessage()), 500);
        }
    }
}
