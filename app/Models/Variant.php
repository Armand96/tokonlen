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
        'is_active',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }

    public function images()
    {
        return $this->hasMany(VariantImage::class, 'variant_id', 'id');
    }
}
