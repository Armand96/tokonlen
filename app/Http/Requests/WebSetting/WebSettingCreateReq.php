<?php

namespace App\Http\Requests\WebSetting;

use App\Http\Requests\ApiRequest;

class WebSettingCreateReq extends ApiRequest
{
    public string $name;
    public string $value;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'value' => 'required|string',
        ];
    }
}
