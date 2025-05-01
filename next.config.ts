import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HASURA_URL: process.env.NEXT_PUBLIC_HASURA_URL,
    NEXT_PUBLIC_HASURA_SECRET: process.env.NEXT_PUBLIC_HASURA_SECRET,
  },
};

export default nextConfig;
