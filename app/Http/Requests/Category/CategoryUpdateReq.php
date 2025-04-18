<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\ApiRequest;

class CategoryUpdateReq extends ApiRequest
{
    public string $name;
    public mixed $image_file;
    public string $image;
    public $parent_id;
    public bool $is_active;
    public bool $is_show_header;

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'image_file' => 'image',
            'image' => 'string',
            'parent_id' => '',
            'is_show_header' => 'boolean',
            'is_active' => 'boolean'
        ];
    }
}
