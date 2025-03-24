<?php

namespace App\Http\Requests\Variant;

use App\Http\Requests\ApiRequest;

class VariantBulkCreateReq extends ApiRequest
{
    public array $variants;

    public function rules(): array
    {
        return [
            'variants' => 'required|array|min:1',
            'variants.*.product_id' => 'required|numeric',
            'variants.*.variant' => 'required|string',
            'variants.*.size' => 'string',
            'variants.*.additional_price' => 'numeric',
            'variants.*.stock' => 'numeric',
            'variants.*.is_active' => 'boolean',
            'variants.*.created_at' => 'string',
            'variants.*.updated_at' => 'string',
        ];
    }
}
