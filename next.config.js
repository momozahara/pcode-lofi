/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
    VERCEL_URL: `https://${process.env.VERCEL_URL}`,
  },
};

module.exports = nextConfig;
