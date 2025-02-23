<?php

namespace App\Http\Requests\Banner;

use App\Http\Requests\ApiRequest;

class BannerUpdateReq extends ApiRequest
{
    public string $name;
    public string $caption;
    public mixed $image_file;
    public string $image;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'caption' => 'required|string',
            'image_file' => 'image',
            'image' => 'string',
            'is_active' => 'boolean'
        ];
    }
}
