/** @type {import('next').NextConfig} */


const nextConfig = {
  output: 'export',
  distDir: 'dist',
  assetPrefix: '/mainApp',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
