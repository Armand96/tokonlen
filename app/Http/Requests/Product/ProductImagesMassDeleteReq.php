<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductImagesMassDeleteReq extends ApiRequest
{
    public array $ids;

    public function rules(): array
    {
        return [
            'ids' => 'required|array',
        ];
    }
}
