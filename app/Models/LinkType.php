<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkType extends Model
{
    protected $fillable = [
        'name',
        'image',
        'image_thumb',
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
