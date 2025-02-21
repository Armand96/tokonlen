<?php

namespace App\Http\Requests\Discount;

use App\Http\Requests\ApiRequest;

class DiscountCreateReq extends ApiRequest
{
    public int $product_id;
    public int $variant_id;
    public float $discount_percentage;
    public float $discount_amount;
    public string $start_date;
    public string $end_date;

    public function rules(): array
    {
        return [
            'product_id' => 'required|numeric',
            'variant_id' => 'required|numeric',
            'discount_percentage' => 'numeric',
            'discount_amount' => 'numeric',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
        ];
    }
}
