<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductLink extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'link',
        'link_type_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
