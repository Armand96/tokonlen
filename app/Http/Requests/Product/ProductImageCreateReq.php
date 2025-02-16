<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductImageCreateReq extends ApiRequest
{
    public int $product_id;
    public mixed $image_files;
    public string $image;
    public string $image_thumb;
    public bool $default;

    public function rules(): array
    {
        return [
            'product_id' => 'required|numeric',
            'image_file' => 'required',
            'image_file.*' => 'image',
        ];
    }
}
