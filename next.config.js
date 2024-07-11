/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    unoptimized: true,
  },
  basePath: '/BlediyeProjesi', // Add your repository name here
  assetPrefix: '/BlediyeProjesi', // Add your repository name here
  output: 'export', // Use the new output option
}

module.exports = nextConfig
