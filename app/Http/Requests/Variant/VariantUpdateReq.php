<?php

namespace App\Http\Requests\Variant;

use App\Http\Requests\ApiRequest;

class VariantUpdateReq extends ApiRequest
{
    public int $product_id;
    public string $variant;
    public string $size;
    public float $additional_price = 0.0;
    public int $stock = 0;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'product_id' => 'required|numeric',
            'variant' => 'required|string',
            'size' => 'string',
            'additional_price' => 'numeric',
            'stock' => 'numeric',
            'is_active' => 'boolean'
        ];
    }
}
