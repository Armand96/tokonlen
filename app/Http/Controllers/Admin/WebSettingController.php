<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseFail;
use App\Http\Requests\ResponseSuccess;
use App\Http\Requests\WebSetting\WebSettingCreateReq;
use App\Http\Requests\WebSetting\WebSettingUpdateReq;
use App\Http\Requests\WebSetting\WebSettingUploadReq;
use App\Models\WebSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WebSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = WebSetting::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }

        // filter by value
        if ($req->has('value')) {
            $query->where('value', 'like', '%' . $req->value . '%');
        }

        // paginate result
        $webSettings = $query->paginate($dataPerPage);

        return $webSettings;
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
    public function store(WebSettingCreateReq $request)
    {
        try {
            $validatedData = $request->validated();
            $webSetting = WebSetting::create($validatedData);
            return response()->json(new ResponseSuccess($webSetting,"Success","Success Create Web Setting"));
        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    public function createWithUpload(WebSettingUploadReq $request)
    {
        $path = "";
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('image_file')) {
                $imageName = time() . '.' . $request->file('image_file')->extension();
                $path = $request->file('image_file')->storeAs('web_setting', $imageName, 'public');
                $validatedData['value'] = $path;
            } else {
                $validatedData['value'] = '';
            }
            $webSetting = WebSetting::create($validatedData);
            return response()->json(new ResponseSuccess($webSetting,"Success","Success Create Category"));
        } catch (\Throwable $th) {
            //throw $th;
            $isExist = Storage::disk('public')->exists($path) ?? false;
            if ($isExist) Storage::disk('public')->delete($path);
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    public function updateWithUpload(WebSettingUploadReq $request, WebSetting $webSetting)
    {
        $path = "";
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('image_file')) {
                $isExist = Storage::disk('public')->exists($webSetting->value) ?? false;
                if ($isExist) Storage::disk('public')->delete($webSetting->value);

                $imageName = time() . '.' . $request->file('image_file')->extension();
                $path = $request->file('image_file')->storeAs('web_setting', $imageName, 'public');
                $validatedData['value'] = $path;
            } else {
                $validatedData['value'] = '';
            }
            $webSetting->update($validatedData);
            return response()->json(new ResponseSuccess($webSetting,"Success","Success Create Web Setting"));
        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(WebSetting $webSetting)
    {
        return response()->json(new ResponseSuccess($webSetting, "Success", "Success Get Web Setting"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WebSetting $webSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WebSettingUpdateReq $request, WebSetting $webSetting)
    {
        try {
            $validatedData = $request->validated();
            $webSetting->update($validatedData);
            return response()->json(new ResponseSuccess($webSetting,"Success","Success Update Web Setting"));
        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Server Error", $th->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WebSetting $webSetting)
    {
        try {
            if($webSetting->type == 'file') {
                $isExist = Storage::disk('public')->exists($webSetting->value) ?? false;
                if ($isExist) Storage::disk('public')->delete($webSetting->value);
            }
            $webSetting->delete();
            return response()->json(new ResponseSuccess($webSetting,"Success", "Success Delete Web Setting"));
        } catch (\Throwable $th) {
            //throw $th;
            Log::error($th->getMessage());
            return response()->json(new ResponseFail((object) null,"Error", $th->getMessage()), 500);
        }
    }
}
