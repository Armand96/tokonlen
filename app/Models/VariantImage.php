<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariantImage extends Model
{
    protected $fillable = [
        'variant_id',
        'image',
        'image_thumb',
        'default',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'id', 'variant_id');
    }
}
