import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "api.pudgypenguins.io",
      },
      {
        protocol: "https",
        hostname: "cdn.moralis.io",
      },
      {
        protocol: "https",
        hostname: "logo.moralis.io",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
