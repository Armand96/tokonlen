<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Variant\VariantImagesMassDeleteReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Http\Requests\Variant\VariantImageCreateReq;
use App\Models\VariantImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VariantImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = VariantImage::query();

        // filter by variant_id
        if ($req->has('variant_id')) {
            $query->where('variant_id', '=', $req->variant_id);
        }

        // paginate result
        $variantImages = $query->paginate($dataPerPage);
        return response()->json(new ResponseSuccess($variantImages, "Success", "Succes Get Variant Images"));
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
    public function store(VariantImageCreateReq $request)
    {
        $variantImages = [];
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
                    $path = $file->storeAs('variant', $imageName, 'public');
                    array_push($imagePaths, $path);
                    $validated['image'] = $path;
                    $validated['image_thumb'] = $path;
                    $productImage = VariantImage::create($validated);
                    array_push($variantImages, $productImage);
                }
                DB::commit();
                return response()->json(new ResponseSuccess($variantImages,"Success", "Success Upload Variant Images"));
            } else {
                return response()->json(new ResponseFail((object) null,"Bad Request", "Image File required"), 404);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();
            //throw $th;
            foreach ($imagePaths as $key => $value) {
                $isExist = Storage::disk('public')->exists($value) ?? false;
                if ($isExist) Storage::disk('public')->delete($value);
            }
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(VariantImage $variantImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VariantImage $variantImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VariantImage $variantImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VariantImage $variantImage)
    {
        try {
            $variantImage->delete();
            Storage::disk('public')->delete($variantImage->image);
            return response()->json(new ResponseSuccess($variantImage,"Success", "Success Delete Variant Image"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }

    public function uploadOneImage(VariantImageCreateReq $request)
    {
        $variantImages = [];
        $imagePaths = [];
        try {
            DB::beginTransaction();
            $productImage = array();
            $validated = $request->validated();
            // dd($validated);
            if ($request->hasFile('image_file')) {
                $file = $request->file('image_file');

                $imageName = time() . '.' . $file->extension();
                $path = $file->storeAs('variant', $imageName, 'public');
                array_push($imagePaths, $path);
                $validated['image'] = $path;
                $validated['image_thumb'] = $path;
                $productImage = VariantImage::create($validated);
                array_push($variantImages, $productImage);

                DB::commit();
                return response()->json(new ResponseSuccess($variantImages,"Success", "Success Upload Variant Image"));
            } else {
                return response()->json(new ResponseFail((object) null,"Bad Request", "Image File required"), 404);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();
            //throw $th;
            foreach ($imagePaths as $key => $value) {
                $isExist = Storage::disk('public')->exists($value) ?? false;
                if ($isExist) Storage::disk('public')->delete($value);
            }
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /* DELETE MASS IMAGE */
    public function destroyMany(VariantImagesMassDeleteReq $request)
    {
        try {
            $validatedData = $request->validated();
            foreach ($validatedData['ids'] as $key => $value) {
                $variantImage = VariantImage::find($value);
                if($variantImage) {
                    $variantImage->delete();
                    Storage::disk('public')->delete($variantImage->image);
                }
            }
            return response()->json(new ResponseSuccess([],"Success", "Success Delete Product Image"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
