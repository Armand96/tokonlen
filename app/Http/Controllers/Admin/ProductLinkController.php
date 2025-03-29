<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductLinkCreateReq;
use App\Http\Requests\Product\ProductLinkUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\ProductLink;
use App\Models\ProductLinkVisit;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = ProductLink::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }
        if ($req->has('link')) {
            $query->where('link', 'like', '%' . $req->link . '%');
        }
        // filter by product
        if ($req->has('product_id')) {
            $query->where('product_id', '=', $req->product_id);
        }
        // filter by variant
        if ($req->has('variant_id')) {
            $query->where('variant_id', '=', $req->variant_id);
        }
        if ($req->has('link_type_id')) {
            $query->where('link_type_id', '=', $req->link_type_id);
        }

        // paginate result
        $productLinks = $query->paginate($dataPerPage);

        return $productLinks;
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
    public function store(ProductLinkCreateReq $request)
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();

            $variantIds = Variant::where('product_id', $validated['product_id'])->pluck('id')->toArray();
            if ($variantIds) {
                // existing link
                foreach ($variantIds as $key => $value) {
                    $variantLink = ProductLink::where('variant_id', $value)->get();
                    if (count($variantLink)) {
                        foreach ($variantLink as $idx => $data) {
                            // dd($variantLink, $validated);
                            if ($data->link_type_id == $validated['link_type_id']) {
                                // dd($validated, $data);
                                $data->update($validated);
                            } else {
                                $temp = $validated;
                                $temp['product_id'] = 0;
                                $temp['variant_id'] = $value;
                                $variantLink = ProductLink::create($temp);
                            }
                        }
                    } else {
                        $temp = $validated;
                        $temp['product_id'] = 0;
                        $temp['variant_id'] = $value;
                        $variantLink = ProductLink::create($temp);
                    }
                }
            }

            $productLink = ProductLink::create($validated);
            DB::commit();
            return response()->json(new ResponseSuccess($productLink, "Success", "Success Create Product Link"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null, "Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductLink $productLink)
    {
        return response()->json(new ResponseSuccess($productLink, "Success", "Success Get ProductLink"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductLink $productLink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductLinkUpdateReq $request, ProductLink $productLink)
    {
        try {
            $validated = $request->validated();
            $productLink->update($validated);
            return response()->json(new ResponseSuccess($productLink, "Success", "Success Update Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null, "Server Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductLink $productLink)
    {
        try {
            DB::beginTransaction();

            $variantIds = Variant::where('product_id', $productLink->product_id)->pluck('id')->toArray();
            foreach ($variantIds as $key => $value) {
                $variantLink = ProductLink::where('variant_id', $value)->where('link_type_id', $productLink->link_type_id)->where('link', $productLink->link)->first();
                if ($variantLink) {
                    $variantLink->delete();
                    ProductLinkVisit::where('product_link_id', $variantLink->id)->delete();
                }
            }

            ProductLinkVisit::where('product_link_id', $productLink->id)->delete();
            $productLink->delete();
            DB::commit();
            return response()->json(new ResponseSuccess($productLink, "Success", "Success Delete Product Link"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null, "Server Error", $th->getMessage()));
        }
    }
}
