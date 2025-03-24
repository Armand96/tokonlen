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
        // DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Suit', 'suit', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48')");
        // DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'Male Suit', 'male-suit', 1, '1739853962.png', NULL, 1, '2025-02-18 04:46:02', '2025-02-18 04:46:02')");
        // DB::insert("INSERT INTO `tokonlen`.`categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (3, 'Female Suit', 'female-suit', 1, '1739853970.png', NULL, 1, '2025-02-18 04:46:10', '2025-02-18 04:46:10')");
    
        $sql = "INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Suit', 'suit', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (4, 'Celana', 'Celana', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (7, 'Kaos Kaki', 'kaos-kaki', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (8, 'Jaket', 'jaket', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (9, 'Seragam Sekolah', 'seragam-sekolah', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (10, 'Baju Koko', 'baju-koko', NULL, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'Male Suit', 'Male Suit', 1, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (5, 'Female Suit', 'Female Suit', 1, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (3, 'Celana Prempuan', 'celana-prempuan', 4, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (6, 'Celana Laki Laki', 'celana-laki-laki', 4, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (11, 'Kaos kaki Laki Laki', 'kaos-kaki-laki-laki', 7, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (12, 'Kaos Kaki Prempuan', 'kaos-kaki-prempuan', 7, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (19, 'Jaket Prempuan', 'jaket-Prempuan', 8, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (20, 'Jaket Laki Laki', 'jaket-laki-laki', 8, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (21, 'Jaket Prempuan', 'jaket-Prempuan', 8, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (22, 'Seragam SD', 'seragam-sd', 9, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (23, 'Seragam SMP', 'seragam-smp', 9, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');
        INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `image`, `image_thumb`, `is_active`, `created_at`, `updated_at`) VALUES (24, 'Seragam SMA', 'seragam-sma', 9, '1739853948.png', NULL, 1, '2025-02-18 04:45:48', '2025-02-18 04:45:48');";
    DB::unprepared($sql);
    
    }
}
