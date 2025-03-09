<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductImageCreateSingleReq extends ApiRequest
{
    public int $product_id;
    public mixed $image_file;
    public string $image;
    public string $image_thumb;
    public bool $default;

    public function rules(): array
    {
        return [
            'product_id' => 'required|numeric',
            'image_file' => 'required|image',
        ];
    }
}
