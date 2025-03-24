<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseSuccess;
use App\Models\ProductLinkVisit;
use Illuminate\Http\Request;

class ProductLinkVisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = ProductLinkVisit::query();

        // filter by ip_address
        if ($req->has('ip_address')) {
            $query->where('ip_address', 'like', '%' . $req->ip_address . '%');
        }
        // filter by user_agent
        if ($req->has('user_agent')) {
            $query->where('user_agent', 'like', '%' . $req->user_agent . '%');
        }

        // filter by product_link_id
        if ($req->has('product_link_id')) {
            $query->where('product_link_id', '=', $req->product_link_id);
        }

        // paginate result
        $visits = $query->paginate($dataPerPage);

        return $visits;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductLinkVisit $productLinkVisit)
    {
        return response()->json(new ResponseSuccess($productLinkVisit->with('subCat')->first(), "Success", "Success Get Link Visit"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductLinkVisit $productLinkVisit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductLinkVisit $productLinkVisit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductLinkVisit $productLinkVisit)
    {
        //
    }
}
