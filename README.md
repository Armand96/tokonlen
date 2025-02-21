-- STEP INSTALLATION
list command:
- composer install
- npm i
- php artisan migrate

buka 2 terminal untuk jalanin tanpa server apache/nginx
- php artisan serve (untuk menjalankan php server)
- npm run dev (untuk menjalankan reactjs hot reload)


# untuk development FE
- arahkan terminal ke resources > mainApp
- lalu jalan npm install (untuk pertama kali)
- setelah nya jalankan npm run dev

# untuk build FE
- masih di terminal yang mengarah ke  resources > mainApp
- jalankan npm run build:laravel maka akan terbentuk folder baru di public yang siap untuk di gunakan