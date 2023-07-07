/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
      return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=120, stale-while-revalidate=120',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
