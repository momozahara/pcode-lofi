/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
