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
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

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
}
