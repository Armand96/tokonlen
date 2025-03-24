<?php

namespace App\Http\Requests\ClientSide;

use App\Http\Requests\ApiRequest;

class LinkVisitCreate extends ApiRequest
{
    public int $product_link_id;
    public int $product_id;
    public string $ip_address;
    public string $user_agent;

    public function rules(): array
    {
        return [
            'product_link_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'ip_address' => 'required|string',
            'user_agent' => 'required|string',
        ];
    }
}
