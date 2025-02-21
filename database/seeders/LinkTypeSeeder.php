<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LinkTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`link_types` (`id`, `name`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Tokopedia', '1739863087.png', NULL, 0, '2025-02-18 07:18:07', '2025-02-18 07:18:19')");
    }
}
