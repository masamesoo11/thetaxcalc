import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://0.0.0.0:3000',
    'http://21.0.11.18:3000',
    'http://21.0.12.240:3000',
    'http://21.0.14.80:3000',
    'http://21.0.16.80:3000',
    'http://localhost:81',
    'http://127.0.0.1:81',
  ],
  // NOTE: redirects() and headers() are handled by src/proxy.ts
  // to avoid Next.js generating a Node.js _middleware that breaks
  // @cloudflare/next-on-pages build (requires Edge Runtime).
};

export default nextConfig;
