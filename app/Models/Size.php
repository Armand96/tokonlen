<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'name',
        'format_size',
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
