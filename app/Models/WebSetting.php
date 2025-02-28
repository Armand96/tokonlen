<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebSetting extends Model
{
    protected $fillable = [
        'name',
        'value'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
