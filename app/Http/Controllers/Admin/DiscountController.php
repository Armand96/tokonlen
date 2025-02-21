<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Discount\DiscountCreateReq;
use App\Http\Requests\Discount\DiscountUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Discount::query();

        // filter by product
        if ($req->has('product_id')) {
            $query->where('product_id', 'like', '%' . $req->product_id . '%')->with('product');
        }
        if ($req->has('variant_id')) {
            $query->where('variant_id', 'like', '%' . $req->variant_id . '%')->with(['variant', 'product']);
        }

        // paginate result
        $discounts = $query->paginate($dataPerPage);

        return $discounts;
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
    public function store(DiscountCreateReq $request)
    {
        try {
            $validated = $request->validated();
            $discount = Discount::create($validated);
            return response()->json(new ResponseSuccess($discount,"Success","Success Create Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Discount $discount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Discount $discount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiscountUpdateReq $request, Discount $discount)
    {
        try {
            $validated = $request->validated();
            $discount->update($validated);
            return response()->json(new ResponseSuccess($discount,"Success","Success Update Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Discount $discount)
    {
        try {
            $discount->delete();
            return response()->json(new ResponseSuccess($discount,"Success","Success Delete Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }
}
