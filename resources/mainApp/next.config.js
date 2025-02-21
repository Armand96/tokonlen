/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    output: 'export',
  distDir: "dist",
    eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        unoptimized: true
      },
}

module.exports = nextConfig
