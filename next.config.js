/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    unoptimized: true,
  },
  basePath: '', // Change to your new repository name
  assetPrefix: '', // Change to your new repository name
}

module.exports = nextConfig
