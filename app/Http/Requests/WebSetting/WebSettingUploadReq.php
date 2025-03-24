<?php

namespace App\Http\Requests\WebSetting;

use App\Http\Requests\ApiRequest;

class WebSettingUploadReq extends ApiRequest
{
    public string $name;
    public mixed $image_file;
    public string $type;
    public string $value;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'image_file' => 'required|file',
            'value' => 'string',
            'type' => 'string'
        ];
    }
}
