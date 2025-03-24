<?php

namespace App\Http\Requests\Variant;

use App\Http\Requests\ApiRequest;

class VariantImagesMassDeleteReq extends ApiRequest
{
    public array $ids;

    public function rules(): array
    {
        return [
            'ids' => 'required|array',
        ];
    }
}
