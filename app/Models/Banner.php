<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Banner extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image',
        'is_acative'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
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
}
