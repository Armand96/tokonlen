<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = [
        'name',
        'parent_id',
        'slug',
        'image',
        'image_thumb',
        'is_show_header',
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function getRouteKeyName(): string
    {
        return 'id'; // Default lookup field is `id`
    }

    public function resolveRouteBinding($value, $field = null): ?Model
    {
        return $this->where('id', $value)->orWhere('slug', $value)->first();
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $slug = Str::slug($value);

        $count = static::where('slug', '=', "$slug%")->count();
        $this->attributes['slug'] = $count ? "{$slug}-{$count}" : $slug;
    }

    public function subCat()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }

    public function parentCat()
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }

    public function isLeaf() {
        return !$this->subCat()->exists(); // Returns true if no children
    }
}
