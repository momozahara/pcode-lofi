/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
    VERCEL_URL: process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
