<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`banners` (`id`, `name`, `slug`, `image`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'Banner', 'banner', 'banner/1740224629.png', 0, '2025-02-22 11:35:25', '2025-02-22 11:43:49')");
    }
}
