<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VariantImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`variant_images` (`id`, `variant_id`, `image`, `image_thumb`, `default`, `created_at`, `updated_at`) VALUES (1, 1, '1739948546_1.png', '1739948546_1.png', 0, '2025-02-19 07:02:26', '2025-02-19 07:02:26')");
        DB::insert("INSERT INTO `tokonlen`.`variant_images` (`id`, `variant_id`, `image`, `image_thumb`, `default`, `created_at`, `updated_at`) VALUES (2, 1, '1739948546_2.png', '1739948546_2.png', 0, '2025-02-19 07:02:26', '2025-02-19 07:02:26')");
    }
}
