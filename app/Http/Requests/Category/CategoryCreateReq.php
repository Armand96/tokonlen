<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\ApiRequest;

class CategoryCreateReq extends ApiRequest
{
    public string $name;
    public mixed $image_file;
    public string $image;
    public int $parent_id;
    public bool $is_active;
    public bool $is_show_header;

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:categories,name|max:100',
            'image_file' => 'required|image',
            'image' => 'string',
            'parent_id' => 'numeric',
            'is_active' => 'boolean',
            'is_show_header' => 'boolean'
        ];
    }
}
