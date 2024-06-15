/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random/**',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'naszsklep-api.vercel.app',
        port: '',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
