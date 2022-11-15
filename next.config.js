/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: 'http://localhost:8080/api/upload'
      },
    ]
  },
}
