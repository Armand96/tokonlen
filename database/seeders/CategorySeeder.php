<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Suit', 'suit', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48')");
        DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'Male Suit', 'male-suit', 1, '1739853962.png', NULL, 1, '2025-02-18 04:46:02', '2025-02-18 04:46:02')");
        DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (3, 'Female Suit', 'female-suit', 1, '1739853970.png', NULL, 1, '2025-02-18 04:46:10', '2025-02-18 04:46:10')");
    }
}
