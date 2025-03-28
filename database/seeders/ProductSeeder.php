<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`products` (`id`, `name`, `slug`, `description`, `price`, `stock`, `brand`, `release_date`, `category_id`, `visited`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Gucci Suits', 'gucci-suits', 'Gucci Suit For Male', 500000.00, 1, 'Gucci', NOW(), 2, 0, 1, '2025-02-18 05:05:28', '2025-02-18 06:45:26')");
    }
}
