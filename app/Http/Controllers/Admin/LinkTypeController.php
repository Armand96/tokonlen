<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LinkType\LinkTypeCreateReq;
use App\Http\Requests\LinkType\LinkTypeUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\LinkType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class LinkTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = LinkType::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }
        // filter by is_active
        if ($req->has('is_active')) {
            $query->where('is_active', '=', $req->is_active);
        }

        // paginate result
        $linkTypes = $query->paginate($dataPerPage);

        return $linkTypes;
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
    public function store(LinkTypeCreateReq $request)
    {
        $imageName = "";
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('image_file')) {
                $imageName = time() . '.' . $request->file('image_file')->extension();
                $path = $request->file('image_file')->storeAs('link_type', $imageName, 'public');
                $validatedData['image'] = $path;
            } else {
                $validatedData['image'] = '';
            }
            $linkType = LinkType::create($validatedData);
            return response()->json(new ResponseSuccess($linkType,"Success","Success Create Link Type"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            $isExist = Storage::disk('public')->exists($path) ?? false;
            if ($isExist) Storage::delete($path);
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LinkType $linkType)
    {
        return response()->json(new ResponseSuccess($linkType, "Success", "Success Get Link Type"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LinkType $linkType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LinkTypeUpdateReq $request, LinkType $linkType)
    {
        $imageName = "";
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('image_file')) {

                $isExist = Storage::disk('public')->exists($linkType->image) ?? false;
                if ($isExist) Storage::disk('public')->delete($linkType->image);

                $imageName = time() . '.' . $request->file('image_file')->extension();
                $path = $request->file('image_file')->storeAs('link_type', $imageName, 'public');
                $validatedData['image'] = $path;
            } else {
                $validatedData['image'] = '';
            }
            $linkType->update($validatedData);
            return response()->json(new ResponseSuccess($linkType,"Success","Success Update Link Type"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LinkType $linkType)
    {
        try {
            $linkType->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($linkType,"Success", "Success Set Link Type To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
