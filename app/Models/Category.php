<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'parent_id',
        'image',
        'image_thumb',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
