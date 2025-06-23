/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      }
    ],
    // Allow image optimization for local images
    unoptimized: false,
  },};

export default nextConfig;
