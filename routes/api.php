<?php

use App\Http\Controllers\Admin\BannerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LinkTypeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\ProductLinkController;
use App\Http\Controllers\Admin\ProductLinkVisitController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VariantController;
use App\Http\Controllers\Admin\VariantImageController;
use App\Http\Controllers\Client\CategoryCController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Client\BannerCController;
use App\Http\Controllers\Client\ProductCController;
use App\Http\Controllers\Client\SearchController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\WebSettingController;
use App\Http\Controllers\Client\SizeCController;
use App\Http\Requests\ResponseFail;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

Route::post('/login', [UserController::class, 'login']);
Route::get('/unauthorized', function(){
    return response()->json(new ResponseFail(null, "Error", "Unauthorized"), 401);
})->name('login');

// Protected routes (Require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully!']);
    });
});

Route::prefix('admin')
    // ->middleware('auth:sanctum')
    ->group(function () {
    /* CRUD ADMIN */
    Route::resource('user', UserController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('product', ProductController::class);
    Route::resource('product_images', ProductImageController::class);
    Route::post('product_image_single', [ProductImageController::class, 'uploadOneImage']);
    Route::resource('link_type', LinkTypeController::class);
    Route::resource('product_link', ProductLinkController::class);
    Route::resource('product_link_visit', ProductLinkVisitController::class);
    Route::resource('variant', VariantController::class);
    Route::resource('variant_images', VariantImageController::class);
    Route::resource('discount', DiscountController::class);
    Route::resource('banner', BannerController::class);
    Route::resource('size', SizeController::class);
    Route::resource('web_setting', WebSettingController::class);
    /* CRUD ADMIN */

    //additional
    Route::post('variant_bulk_insert', [VariantController::class, 'bulkInsert']);
});

// Route::group(function() {
    // CATEGORY
    Route::get('category', [CategoryCController::class, 'getListActiveCategory'])->name('category.list');
    Route::get('category/{category}', [CategoryCController::class, 'getOneActiveCategoryWithProducts'])->name('category.one');
    // PRODUCT
    Route::get('product', [ProductCController::class, 'getListActiveProduct'])->name('product.list');
    Route::get('product/{product}', [ProductCController::class, 'getOneActiveProductWithProducts'])->name('product.one');
    Route::get('brand', [ProductCController::class, 'getDistinctBrand']);
    Route::post('link_visit', [ProductCController::class, 'counterLinkVisit']);
    // BANNER
    Route::get('banner', [BannerCController::class, 'getListActiveBanner'])->name('banner.list');
    Route::get('banner/{banner}', [BannerCController::class, 'getOneActiveBanner'])->name('banner.one');

    // SIZE
    Route::get('size', [SizeCController::class, 'getListActiveSize']);
    Route::get('size/{size}', [SizeCController::class, 'getOneActiveSize']);
    Route::get('size_distinct/{product}', [ProductCController::class, 'getDistinctSize']);

    Route::get('search', [SearchController::class, 'search']);
// });
