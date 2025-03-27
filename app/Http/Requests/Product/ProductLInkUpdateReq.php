<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductLinkUpdateReq extends ApiRequest
{
    public int $product_id;
    public int $variant_id;
    public string $link;
    public int $link_type_id;

    public function rules(): array
    {
        return [
            'product_id' => 'required|numeric',
            'variant_id' => 'required|numeric',
            'link' => 'required|string',
            'link_type_id' => 'required|numeric',
        ];
    }
}
