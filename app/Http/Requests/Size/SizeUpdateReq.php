<?php

namespace App\Http\Requests\Size;

use App\Http\Requests\ApiRequest;

class SizeUpdateReq extends ApiRequest
{
    public string $name;
    public string $format_size;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'format_size' => 'required|string',
            'is_active' => 'boolean'
        ];
    }
}
