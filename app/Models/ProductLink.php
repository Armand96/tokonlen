<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductLink extends Model
{
    protected $fillable = [
        'product_id',
        'variant_id',
        'name',
        'link',
        'link_type_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function linkType()
    {
        return $this->belongsTo(LinkType::class, 'link_type_id', 'id');
    }

    public function visitors()
    {
        return $this->hasMany(ProductLinkVisit::class, 'product_link_id', 'id');
    }
}
