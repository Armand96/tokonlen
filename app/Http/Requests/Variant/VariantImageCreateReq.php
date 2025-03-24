<?php

namespace App\Http\Requests\Variant;

use App\Http\Requests\ApiRequest;

class VariantImageCreateReq extends ApiRequest
{
    public int $variant_id;
    public mixed $image_file;
    public string $image;
    public string $image_thumb;
    public bool $default;

    public function rules(): array
    {
        return [
            'variant_id' => 'required|numeric',
            'image_file' => 'required|image',
        ];
    }
}
