<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductLinkVisit extends Model
{
    protected $fillable = [
        'product_link_id',
        'ip_address',
        'user_agent',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
