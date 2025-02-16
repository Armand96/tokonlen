<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'visited',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
