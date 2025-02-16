<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\ApiRequest;

class CategoryUpdateRequest extends ApiRequest
{
    public string $name;
    public mixed $image_file;
    public string $image;

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:categories,name|max:100',
            'image_file' => 'image'
        ];
    }
}
