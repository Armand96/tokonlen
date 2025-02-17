<?php

// use App\Http\Controllers\Admin\CategoryController;
// use App\Http\Controllers\Admin\ProductController;
// use App\Http\Controllers\Admin\ProductImagesController;
// use App\Http\Controllers\Admin\ProductLinkController;
// use App\Http\Controllers\Admin\UserController;
// use App\Http\Controllers\Admin\VariantController;
// use App\Http\Controllers\Admin\VariantImagesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get("/testreact", function () {
    return view("react.testreact");
});

