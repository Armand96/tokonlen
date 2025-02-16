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
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $slug = Str::slug($value);

        $count = static::where('slug', 'LIKE', "$slug%")->count();
        $this->attributes['slug'] = $count ? "{$slug}-{$count}" : $slug;
    }
}
