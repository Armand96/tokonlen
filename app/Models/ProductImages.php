<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    protected $fillable = [
        'product_id',
        'image',
        'image_thumb',
        'default',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
