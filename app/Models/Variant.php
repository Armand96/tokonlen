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

    protected $casts = [
        'additional_price' => 'float',
        'final_price' => 'float',
        'discount_amount' => 'float',
        'discount_percentage' => 'float',
        'discount_price' => 'float',
    ];

    protected $appends = ['final_price', 'discount_price'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(VariantImage::class, 'variant_id', 'id');
    }

    public function image()
    {
        return $this->hasOne(VariantImage::class, 'variant_id', 'id')->orderBy('default')->limit(1);
    }

    public function discount()
    {
        return $this->hasOne(Discount::class, 'variant_id', 'id')
        ->where('start_date', '<=', date('Y-m-d'))->where('end_date', '>=', date('Y-m-d'));
    }

    public function getFinalPriceAttribute()
    {
        if ($this->discount) {
            if($this->discount->discount_percentage > 0) {
                return (float) ($this->product->price + $this->additional_price) - ((float) ($this->price+$this->additional_price) * ((float)$this->discount->discount_percentage / 100));
            } else {
                return (float) ($this->product->price + $this->additional_price) - (float) $this->discount->discount_amount;
            }
        }
        return $this->product->price + $this->additional_price;
    }

    public function getDiscountPriceAttribute()
    {
        if($this->discount) {
            if($this->discount->discount_percentage > 0) {
                return (float) ($this->product->price+$this->additional_price) * ((float) $this->discount->discount_percentage / 100);
            } else {
                return (float) $this->discount->discount_amount;
            }
        }
        return 0;
    }
}
