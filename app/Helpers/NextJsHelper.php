<?php

namespace App\Helpers;

class NextjsHelper
{
    public static function getNextAssets($type)
    {
        $path = public_path("mainApp/_next/static/chunks/$type");
        if (!file_exists($path)) return [];

        $files = array_diff(scandir($path), ['.', '..']);
        return array_values($files);
    }
}
