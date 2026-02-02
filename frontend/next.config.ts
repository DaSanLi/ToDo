import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  allowedDevOrigins: [
    'http://localhost:4000/'
  ],
};

export default nextConfig;
