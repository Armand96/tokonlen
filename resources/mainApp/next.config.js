/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    output: 'export',
  distDir: "dist",
  assetPrefix: "/mainApp",
    eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        unoptimized: true
      },
}

module.exports = nextConfig
