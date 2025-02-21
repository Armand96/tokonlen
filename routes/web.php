<?php

// use App\Http\Controllers\Admin\CategoryController;
// use App\Http\Controllers\Admin\ProductController;
// use App\Http\Controllers\Admin\ProductImagesController;
// use App\Http\Controllers\Admin\ProductLinkController;
// use App\Http\Controllers\Admin\UserController;
// use App\Http\Controllers\Admin\VariantController;
// use App\Http\Controllers\Admin\VariantImagesController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get("/", function () {
//     return view("react.mainApp");
// });


use Illuminate\Support\Facades\File;

Route::get('/{any?}', function ($any = null) {
    $filePath = public_path($any ? "/mainApp/{$any}.html" : "/mainApp/index.html");

    if (File::exists($filePath)) {
        return File::get($filePath);
    }

    abort(404);
})->where('any', '.*');
