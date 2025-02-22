<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\BannerCreateReq;
use App\Http\Requests\Banner\BannerUpdateReq;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Banner::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }

        // paginate result
        $banners = $query->paginate($dataPerPage);

        return $banners;
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
    public function store(BannerCreateReq $createBannerReq)
    {
        $path = "";
        try {
            $validatedData = $createBannerReq->validated();

            if ($createBannerReq->hasFile('image_file')) {
                $imageName = time() . '.' . $createBannerReq->file('image_file')->extension();
                $path = $createBannerReq->file('image_file')->storeAs('banner', $imageName, 'public');
                $validatedData['image'] = $path;
            } else {
                $validatedData['image'] = '';
            }
            $banner = Banner::create($validatedData);
            return response()->json(new ResponseSuccess($banner,"Success","Success Create Banner"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;

            $isExist = Storage::disk('public')->exists($path) ?? false;
            if ($isExist) Storage::disk('public')->delete($path);
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        return response()->json(new ResponseSuccess($banner, "Success", "Success Get Banner"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BannerUpdateReq $updateBanner, Banner $banner)
    {
        $imageName = "";
        try {
            $validatedData = $updateBanner->validated();

            if ($updateBanner->hasFile('image_file')) {
                $isExist = Storage::disk('public')->exists($banner->image) ?? false;
                if ($isExist) Storage::disk('public')->delete($banner->image);

                $imageName = time() . '.' . $updateBanner->file('image_file')->extension();
                $path = $updateBanner->file('image_file')->storeAs('banner', $imageName, 'public');
                $validatedData['image'] = $path;
            }
            $banner->update($validatedData);
            return response()->json(new ResponseSuccess($banner,"Success", "Success Update Banner"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        try {
            $banner->update(['is_active' => false]);
            return response()->json(new ResponseSuccess($banner,"Success", "Success Set Banner To Inactive"));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            //throw $th;
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
