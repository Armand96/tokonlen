<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerCController extends Controller
{
    public function getListActiveBanner()
    {
        $banners = Banner::where('is_active', true)->get();
        return response()->json(new ResponseSuccess($banners, "Success", "Success Get Banner"));
    }

    public function getOneActiveBanner(Banner $banner)
    {
        if($banner) return response()->json(new ResponseSuccess($banner->where('is_active', true)->where('id', $banner->id)->first(), "Success", "Success Get Banner"));
        else return response()->json(new ResponseFail((object) null, "Error", "Not Found"), 404);
    }
}
