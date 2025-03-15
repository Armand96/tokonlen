<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::insert(
        "INSERT INTO `web_settings` (`id`, `name`, `type`, `value`, `created_at`, `updated_at`) VALUES
	    (1, 'about-us', 'text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis laoreet est, id aliquet tortor faucibus eget. Duis egestas metus nec viverra vestibulum. Nunc at ornare lorem. Donec at nibh pellentesque, molestie ex non, pulvinar leo. Nullam in diam vel metus varius accumsan. Pellentesque ultricies rutrum dolor eget pulvinar. Donec sodales dui id libero commodo, nec elementum tortor cursus. Vivamus vel commodo felis, in suscipit nisi. Ut ullamcorper ligula quis consequat euismod. Morbi quis scelerisque nibh. Mauris placerat nisi sed mi ultrices consectetur.', '2025-03-06 15:20:59', '2025-03-06 15:20:59'),
	    (2, 'wa-order', 'text', '098182122', '2025-03-06 15:21:38', '2025-03-06 15:21:38'),
	    (3, 'wa-general', 'text', '6289697404581', '2025-03-12 10:31:14', '2025-03-12 10:31:14'),
	    (5, 'alamat', 'text', 'Bogor', NULL, NULL),
	    (6, 'about-us-title', 'text', 'Tentang Kami', NULL, NULL),
	    (7, 'email', 'text', 'lorem@gmail.com', NULL, NULL),
	    (13, 'popup', 'file', 'web_setting/1741982761.webp', '2025-03-14 13:06:01', '2025-03-14 13:06:01'),
	    (14, 'link-popup', 'text', 'image', '2025-03-15 02:05:05', '2025-03-15 02:05:05')"
        );
    }
}
