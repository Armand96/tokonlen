<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Userseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('admin');
        DB::insert("INSERT INTO `tokonlen`.`users` (`id`, `name`, `username`, `email`, `image`, `image_thumb`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES (1, 'Admin', 'admin', 'admin@admin.com', NULL, NULL, NULL, '$password', NULL, NULL, NULL)");
    }
}
