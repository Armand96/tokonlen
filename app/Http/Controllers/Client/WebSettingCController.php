<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseSuccess;
use App\Models\WebSetting;
use Illuminate\Http\Request;

class WebSettingCController extends Controller
{
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

    public function show(WebSetting $webSetting)
    {
        return response()->json(new ResponseSuccess($webSetting, "Success", "Success Get Web Setting"));
    }
}
