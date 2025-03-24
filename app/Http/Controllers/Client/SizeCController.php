<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseSuccess;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeCController extends Controller
{
    public function getListActiveSize(Request $req)
    {
        $dataPerPage = $req->data_per_page ? $req->data_per_page : 10;
        $query = Size::query();

        // filter by name
        if ($req->has('name')) {
            $query->where('name', 'like', '%' . $req->name . '%');
        }

        $query->where('is_active', true);
        $sizes = $query->paginate($dataPerPage);
        return $sizes;
        // return response()->json(new ResponseSuccess($sizes, "Success", "Success Get Categories"));
    }

    public function getOneActiveSize(Size $size)
    {
        return response()->json(new ResponseSuccess($size, "Success", "Success get size"));
    }
}
