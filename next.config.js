/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/waterschap-app',
  assetPrefix: '/waterschap-app/',
  images: { unoptimized: true },
}

module.exports = nextConfig
