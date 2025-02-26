<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Size\SizeCreateReq;
use App\Http\Requests\Size\SizeUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Size::query();

        // filter by product
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%')->with('product');
        }
        if ($req->has('format_size')) {
            $query->where('format_size', 'like', '%' . $req->format_size . '%')->with(['variant', 'product']);
        }

        // paginate result
        $sizes = $query->paginate($dataPerPage);

        return $sizes;
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
    public function store(SizeCreateReq $request)
    {
        try {
            $validated = $request->validated();
            $size = Size::create($validated);
            return response()->json(new ResponseSuccess($size,"Success","Success Create Master Size"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size)
    {
        return response()->json(new ResponseSuccess($size, "Success", "Success Get Size"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Size $size)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SizeUpdateReq $request, Size $size)
    {
        try {
            $validated = $request->validated();
            $size->update($validated);
            return response()->json(new ResponseSuccess($size,"Success","Success Update Master Size"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
    {
        try {
            $size->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($size,"Success","Success Set Master Size to inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()));
        }
    }
}
