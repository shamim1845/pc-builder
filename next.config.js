/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.startech.com.bd",
      },
    ],
  },
};

module.exports = nextConfig;
