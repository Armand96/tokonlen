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
        DB::insert("INSERT INTO `tokonlen`.`products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `visited`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Gucci Suits', 'Gucci Suit For Male', 500000.00, 1, 2, 0, 1, '2025-02-18 05:05:28', '2025-02-18 06:45:26');");
    }
}
