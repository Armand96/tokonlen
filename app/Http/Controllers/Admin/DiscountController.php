<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Discount\DiscountCreateReq;
use App\Http\Requests\Discount\DiscountUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Discount;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        if ($req->has('product_name')) {
            $query->whereHas('product', function ($qry) use ($req) {
                $qry->where('name', 'like', '%'.$req->product_name.'%');
            });
        }
        if ($req->has('variant_id')) {
            $query->where('variant_id', 'like', '%' . $req->variant_id . '%')->with(['variant', 'product']);
        }
        if ($req->has('variant_name')) {
            $query->whereHas('variant', function ($qry) use ($req) {
                $qry->where('name', '=', '%'.$req->variant_name.'%');
            });
        }

        $query->with(['product', 'variant.product']);

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
            $canProcess = false;

            DB::beginTransaction();

            if($validated['variant_id']){
                $variant = Variant::where('id', $validated['variant_id'])->first();
                $canProcess = $this->canProcessDiscount($validated['discount_amount'], $validated['discount_percentage'], $variant->product->price+$variant->additional_price);
                $existingDiscount = Discount::where('product_id', $variant->product_id)->first();
                if($existingDiscount) {
                    $existingDiscount->delete();
                }
            } else {
                $product = Product::find( $validated['variant_id']);
                $canProcess = $this->canProcessDiscount($validated['discount_amount'], $validated['discount_percentage'], $product->price);
            }

            if(!$canProcess) return response()->json(new ResponseFail($validated,"Bad Request", "Discount melebihi harga produk"));

            $discount = Discount::create($validated);
            DB::commit();
            return response()->json(new ResponseSuccess($discount,"Success","Success Create Discount"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Discount $discount)
    {
        return response()->json(new ResponseSuccess($discount->with(['product', 'variant.product'])->where('id', $discount->id)->first(),"Success","Success Get Discount"));
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
            $canProcess = false;

            DB::beginTransaction();

            if($validated['variant_id']){
                $variant = Variant::where('id', $validated['variant_id'])->first();
                $canProcess = $this->canProcessDiscount($validated['discount_amount'], $validated['discount_percentage'], $variant->product->price+$variant->additional_price);
                $existingDiscount = Discount::where('product_id', $variant->product_id)->first();
                if($existingDiscount) {
                    $existingDiscount->delete();
                }
            } else {
                $product = Product::find( $validated['variant_id']);
                $existingDiscount = Discount::where('variant', $product->variant->id)->first();
                if($existingDiscount) {
                    $existingDiscount->delete();
                }
                $canProcess = $this->canProcessDiscount($validated['discount_amount'], $validated['discount_percentage'], $product->price);
            }

            if(!$canProcess) return response()->json(new ResponseFail($validated,"Bad Request", "Discount melebihi harga produk"));
            $discount->update($validated);

            DB::commit();

            return response()->json(new ResponseSuccess($discount,"Success","Success Update Discount"));
        } catch (\Throwable $th) {
            DB::rollBack();
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
            return response()->json(new ResponseSuccess($discount,"Success","Success Delete Discount"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    private function canProcessDiscount(float $discountPriceAmount = 0, float $discountPricePerc = 0, float $price)
    {
        if($discountPriceAmount == 0) {
            $amount = ($discountPriceAmount / 100) * $price;
            if($price > $amount) return true;
            else return false;
        } else {
            if($price > $discountPriceAmount) return true;
            else return false;
        }
    }
}
