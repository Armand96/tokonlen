<?php

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
use App\Http\Controllers\DiscountController;
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
    Route::resource('user', UserController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('product', ProductController::class);
    Route::resource('product_images', ProductImageController::class);
    Route::resource('link_type', LinkTypeController::class);
    Route::resource('product_link', ProductLinkController::class);
    Route::resource('product_link_visit', ProductLinkVisitController::class);
    Route::resource('variant', VariantController::class);
    Route::resource('variant_images', VariantImageController::class);
    Route::resource('discount', DiscountController::class);
});
