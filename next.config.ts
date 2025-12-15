/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alhady21.runasp.net',
      },
    ],
  },
};

export default nextConfig;
