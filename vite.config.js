import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
    base: '/admin',
    plugins: [
        laravel({
            input: [
                'resources/js/backoffice/src/index.tsx'
            ],
            refresh: true,
        }),
        react()
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "resources/js/backoffice/src"),
        },
      },
});
