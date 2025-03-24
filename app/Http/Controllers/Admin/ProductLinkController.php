<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductLinkCreateReq;
use App\Http\Requests\Product\ProductLinkUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\ProductLink;
use App\Models\ProductLinkVisit;
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
        // filter by category
        if ($req->has('product_id')) {
            $query->where('product_id', '=', $req->product_id);
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
            $validated = $request->validated();
            $productLink = ProductLink::create($validated);
            return response()->json(new ResponseSuccess($productLink,"Success","Success Create Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
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
            return response()->json(new ResponseSuccess($productLink,"Success","Success Update Product Link"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductLink $productLink)
    {
        try {
            DB::beginTransaction();
            ProductLinkVisit::where('product_link_id', $productLink->id);
            $productLink->delete();
            DB::commit();
            return response()->json(new ResponseSuccess($productLink,"Success","Success Delete Product Link"));
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }
}
