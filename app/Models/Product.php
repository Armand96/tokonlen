<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'visited',
        'release_date',
        'brand',
        'is_active'
    ];

    protected $appends = ['final_price', 'discount_price'];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $slug = Str::slug($value);

        $count = static::where('slug', '=', "$slug%")->count();
        $this->attributes['slug'] = $count ? "{$slug}-{$count}" : $slug;
    }

    public function getRouteKeyName(): string
    {
        return 'id'; // Default lookup field is `id`
    }

    public function resolveRouteBinding($value, $field = null): ?Model
    {
        return $this->where('id', $value)->orWhere('slug', $value)->first();
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    public function image()
    {
        return $this->hasOne(ProductImage::class, 'product_id', 'id')->orderBy('default')->limit(1);
    }

    public function variant()
    {
        return $this->hasMany(Variant::class, 'product_id', 'id');
    }

    public function links()
    {
        return $this->hasMany(ProductLink::class, 'product_id', 'id');
    }

    public function discount()
    {
        return $this->hasOne(Discount::class, 'product_id', 'id')
        ->where('start_date', '<=', date('Y-m-d'))->where('end_date', '>=', date('Y-m-d'));
    }

    public function getFinalPriceAttribute()
    {
        if ($this->discount) {
            if($this->discount->discount_percentage > 0) {
                return (float) $this->price - ((float) $this->price * ((float)$this->discount->discount_percentage / 100));
            } else {
                return (float) $this->price - (float) $this->discount->discount_amount;
            }
        }
        return $this->price;
    }

    public function getDiscountPriceAttribute()
    {
        if($this->discount) {
            if($this->discount->discount_percentage > 0) {
                return (float) $this->price * ((float) $this->discount->discount_percentage / 100);
            } else {
                return (float) $this->discount->discount_amount;
            }
        }
        return 0;
    }

}
