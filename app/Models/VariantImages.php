<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariantImages extends Model
{
    protected $fillable = [
        'variant_id',
        'image',
        'image_thumb',
        'default',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
