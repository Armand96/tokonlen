<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        'product_id',
        'variant_id',
        'discount_percentage',
        'discount_amount',
        'start_date',
        'end_date',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'id', 'variant_id');
    }
}
