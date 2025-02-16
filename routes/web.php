<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImagesController;
use App\Http\Controllers\ProductLinkController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\VariantImagesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get("/testreact", function () {
    return view("react.testreact");
});

Route::prefix('admin')->group(function () {
    Route::resource('user', UserController::class);;
    Route::resource('category', CategoryController::class);;
    Route::resource('product', ProductController::class);;
    Route::resource('product_images', ProductImagesController::class);;
    Route::resource('product_link', ProductLinkController::class);;
    Route::resource('variant', VariantController::class);;
    Route::resource('variant_images', VariantImagesController::class);;
});
