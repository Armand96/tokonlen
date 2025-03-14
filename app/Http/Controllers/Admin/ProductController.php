<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductCreateReq;
use App\Http\Requests\Product\ProductUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->input('data_per_page', 10);

        $products = Product::query()
        ->when($req->filled('name'), fn ($q) => $q->where('name', 'like', "%{$req->name}%"))
        ->when($req->filled('category_id'), fn ($q) => $q->where('category_id', $req->category_id))
        ->when($req->filled('has_variants'), fn ($q) =>
            strtolower($req->has_variants) == "y" ? $q->has('variant') : $q->doesntHave('variant')
        )
        ->with(['category', 'images', 'discount'])
        ->orderBy('id', 'desc')
        ->paginate($dataPerPage);

        return $products;
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
    public function store(ProductCreateReq $request)
    {
        try {
            $validated = $request->validated();
            $product = Product::create($validated);
            return response()->json(new ResponseSuccess($product,"Success","Success Create Product"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json(new ResponseSuccess($product->with(['variant.images', 'links.linkType', 'images', 'discount', 'category.subCat', 'category.parentCat'])->where('id', $product->id)->first(), "Success", "Success Get Product"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateReq $request, Product $product)
    {
        try {
            $validated = $request->validated();
            $product->update($validated);
            return response()->json(new ResponseSuccess($product,"Success", "Success Update Product"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($product,"Success", "Success Set Product To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()));
        }
    }
}
