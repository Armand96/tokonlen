<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\ApiRequest;

class ProductUpdateReq extends ApiRequest
{
    public string $name;
    public string $description;
    public float $price;
    public int $stock;
    public int $category_id;
    public int $visited;
    public string $release_date;
    public string $brand;
    public bool $is_active;

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'category_id' => 'required|numeric',
            'brand' => 'required|string',
            'release_date' => 'required|string',
            'is_active' => 'boolean',
        ];
    }
}
