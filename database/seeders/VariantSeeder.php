<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert("INSERT INTO `tokonlen`.`variants` (`id`, `product_id`, `variant`, `size`, `additional_price`, `stock`, `visited`, `is_active`, `created_at`, `updated_at`) VALUES (1, 1, 'Merah', 'normal', 50000.00, 5, 0, 0, '2025-02-19 04:57:20', '2025-02-19 04:59:29')");
    }
}
