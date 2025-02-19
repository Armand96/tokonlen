<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductImageCreateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = ProductImage::query();

        // filter by category
        if ($req->has('product_id')) {
            $query->where('product_id', '=', $req->product_id);
        }

        // paginate result
        $productImages = $query->paginate($dataPerPage);
        return response()->json(new ResponseSuccess($productImages, "Success", "Succes Get Product Images"));
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
        $productImages = [];
        $imagePaths = [];
        try {
            DB::beginTransaction();
            $productImage = array();
            $validated = $request->validated();
            // dd($validated);
            if ($request->hasFile('image_files')) {
                $files = $request->file('image_files');

                foreach ($files as $key => $file) {
                    // dd($file);
                    $imageName = time() . '_' . $key+1 . '.' . $file->extension();
                    $file->storeAs('public/products/', $imageName);
                    array_push($imagePaths, $imageName);
                    $validated['image'] = $imageName;
                    $validated['image_thumb'] = $imageName;
                    $productImage = ProductImage::create($validated);
                    array_push($productImages, $productImage);
                }
                DB::commit();
                return response()->json(new ResponseSuccess($productImages,"Success", "Success Upload Product Images"));
            } else {
                return response()->json(new ResponseFail((object) null,"Bad Request", "Image File required"), 404);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();
            //throw $th;
            foreach ($imagePaths as $key => $value) {
                $isExist = Storage::disk('public')->exists("products/$value") ?? false;
                if ($isExist) Storage::delete("public/products/$value");
            }
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
            $productImage->delete();
            Storage::delete("public/products/$productImage->image");
            return response()->json(new ResponseSuccess($productImage,"Success", "Success Delete Product Images"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
