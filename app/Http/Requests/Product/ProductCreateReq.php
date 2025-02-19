<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductCreateReq extends ApiRequest
{
    public string $name;
    public string $description;
    public float $price;
    public int $stock;
    public int $category_id;
    public int $visited;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'category_id' => 'required|numeric',
            'is_active' => 'boolean',
        ];
    }
}
