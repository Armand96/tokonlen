<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Http\Requests\Variant\VariantBulkCreateReq;
use App\Http\Requests\Variant\VariantCreateReq;
use App\Http\Requests\Variant\VariantUpdateReq;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Variant::query();

        // filter by variant
        if ($req->has('variant')) {
            $query->where('variant', 'like', '%' . $req->variant . '%');
        }
        // filter by size
        if ($req->has('size')) {
            $query->where('size', 'like', '%' . $req->size . '%');
        }
        // filter by product_id
        if ($req->has('product_id')) {
            $query->where('product_id', '=', $req->product_id);
        }
        // filter by is_active
        if ($req->has('is_active')) {
            $query->where('is_active', '=', $req->is_active);
        }


        // paginate result
        $variants = $query->with(['product'])->paginate($dataPerPage);

        return $variants;
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
    public function store(VariantCreateReq $request)
    {
        try {
            $validated = $request->validated();
            $variant = Variant::create($validated);
            return response()->json(new ResponseSuccess($variant,"Success","Success Create Variant"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Variant $variant)
    {
        return response()->json(new ResponseSuccess($variant->with(['product.category', 'images', 'discount'])->where('id', $variant->id)->first(), "Success", "Success Get Variant"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Variant $variant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VariantUpdateReq $request, Variant $variant)
    {
        try {
            $validated = $request->validated();
            $variant->update($validated);
            return response()->json(new ResponseSuccess($variant,"Success","Success Update Variant"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variant $variant)
    {
        try {
            $variant->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($variant,"Success", "Success Set Variant To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()));
        }
    }

    public function bulkInsert(VariantBulkCreateReq $request)
    {
        try {
            $variants = $request->validated()['variants'];
            $returnVariants = [];
            DB::beginTransaction();

            foreach ($variants as $key => $value) {
                $data = Variant::create($value);
                array_push($returnVariants, $data);
            }

            DB::commit();

            return response()->json(new ResponseSuccess($returnVariants,"Success","Success Create Bulk Variant"));
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()));
        }
    }
}
