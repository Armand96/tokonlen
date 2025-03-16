/** @type {import('next').NextConfig} */

const {  PHASE_DEVELOPMENT_SERVER }  = require('next/dist/shared/lib/constants');

const nextConfig = (phase) => {
  const dev = PHASE_DEVELOPMENT_SERVER


  return ({
    output: 'export',
    distDir: 'dist',
    assetPrefix: dev == phase ?  '/'  :'/mainApp',
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      unoptimized: true,
    },
  })
}
  


module.exports = nextConfig;
