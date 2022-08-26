/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
        },
      ],
    },
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-sexy-blog/:path*',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/pocketList',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '(?<offset>.*)', // Named capture group to match anything on the value}
          },
          {
            type: 'query',
            key: 'limit',
            value: '(?<limit>.*)', // Named capture group to match anything on the value}
          },
        ],
        destination: `${BASE_URL}?offset=:offset&limit=:limit}`,
      },
      {
        source: '/api/movies/detail/:id',
        destination: `${BASE_URL}/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
