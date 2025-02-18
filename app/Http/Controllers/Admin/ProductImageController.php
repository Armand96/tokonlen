<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductImageCreateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = ProductImage::where('product_id', '=', $request->product_id);
        return response()->json(new ResponseSuccess($data, "Success", "Succes Get Product Images"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        throw new NotFoundResourceException();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductImageCreateReq $request)
    {
        try {
            if ($request->hasFile('image_files')) {
                $files = $request->file('image_files');

                foreach ($files as $key => $file) {
                    $imageName = time() . '.' . $request->image_file->extension();
                    $request->image_file->storeAs('public/products/', $imageName);
                    $request->image = $imageName;
                }

                $category = ProductImage::create($request);
                return response()->json(new ResponseSuccess($category,"Success", "Success Upload Product Image"));
            } else {
                return response()->json(new ResponseFail((object) null,"Bad Request", "Image File required"), 404);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductImage $productImage)
    {
        return response()->json(new ResponseSuccess($productImage, "Success", "Success Get Product Image"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImage $productImage)
    {
        throw new NotFoundResourceException();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductImage $productImage)
    {
        throw new NotFoundResourceException();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductImage $productImage)
    {
        try {
            Storage::delete("public/category/$productImage->image");
            return response()->json(new ResponseSuccess($productImage,"Success", "Success Delete Product Images"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
