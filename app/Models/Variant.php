<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = [
        'product_id',
        'variant',
        'size',
        'additional_price',
        'stock',
        'visited',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
