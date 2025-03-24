<?php

namespace App\Http\Requests\WebSetting;

use App\Http\Requests\ApiRequest;

class WebSettingUpdateReq extends ApiRequest
{
    public string $name;
    public string $type;
    public string $value;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'type' => 'required|string',
            'value' => 'required|string',
        ];
    }
}
