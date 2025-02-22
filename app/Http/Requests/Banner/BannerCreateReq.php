<?php

namespace App\Http\Requests\Banner;

use App\Http\Requests\ApiRequest;

class BannerCreateReq extends ApiRequest
{
    public string $name;
    public mixed $image_file;
    public string $image;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'image_file' => 'required|image',
            'image' => 'string',
            'is_active' => 'boolean'
        ];
    }
}
