<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDataDashboard()
    {
        $data = [
            'topTenVisitedProduct' => $this->topTenProductClicked(),
            'topTenVisitedVariant' => $this->topTenVariantClicked(),
            'topTenVisitedProductMonthly' => $this->topTenProductClicked(date('Y-m-01'), date('Y-m-t')),
            'topTenVisitedVariantMonthly' => $this->topTenVariantClicked(date('Y-m-01'), date('Y-m-t')),
            'totalProduct' => $this->getTotalProduct(),
            'totalDisc' => $this->getTotalProductDiscount() + $this->getTotalVariantDiscount(),
            'totalVariant' => $this->getTotalVariants() ,
        ];

        return $data;
    }

    public function getTotalProduct(): int
    {
        return Product::count();
    }

    public function getTotalCategory(): int
    {
        return Category::count();
    }

    public function getTotalProductDiscount(): int
    {
        return Product::whereHas('discount')->count();
    }

    public function getTotalVariantDiscount(): int
    {
        return Variant::whereHas('discount')->count();
    }

    public function getTotalVariants(): int
    {
        return Variant::whereHas('discount')->count();
    }

    public function topTenProductClicked($dateStart = '', $dateEnd = '')
    {
        $data = Product::doesntHave('variant')
            ->whereHas('links')
            ->with(['links', 'image'])
            ->withCount([
                'links as links_count',
                'links as links_visitors_count' => function ($query) use ($dateStart, $dateEnd) {
                    $query->whereHas('visitors', function ($q) use ($dateStart, $dateEnd) {
                        if (!empty($dateStart) && !empty($dateEnd)) {
                            $q->whereBetween('created_at', [$dateStart, $dateEnd]);
                        } else {
                            $q->whereBetween('created_at', [date('Y') . '-01-01', date('Y') . '-12-31']);
                        }
                    });
                }
            ])
            ->orderByDesc('links_visitors_count')
            ->with('category')
            ->limit(10)
            ->get();

        return $data;
    }

    public function topTenVariantClicked($dateStart = '', $dateEnd = '')
    {
        $data = Variant::whereHas('links')
            ->with(['links', 'image'])
            ->withCount([
                'links as links_count',
                'links as links_visitors_count' => function ($query) use ($dateStart, $dateEnd) {
                    $query->whereHas('visitors', function ($q) use ($dateStart, $dateEnd) {
                        if (!empty($dateStart) && !empty($dateEnd)) {
                            $q->whereBetween('created_at', [$dateStart, $dateEnd]);
                        } else {
                            $q->whereBetween('created_at', [date('Y') . '-01-01', date('Y') . '-12-31']);
                        }
                    });
                }
            ])
            ->orderByDesc('links_visitors_count')
            ->limit(10)
            ->get();
        return $data;
    }
}
