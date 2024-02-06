/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.themealdb.com', 'picsum.photos' , 'm.media-amazon.com'],
  },
};

module.exports = nextConfig;
