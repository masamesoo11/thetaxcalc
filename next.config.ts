import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Hide X-Powered-By header (minor security/SEO hygiene)
  poweredByHeader: false,
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
  // NOTE: redirects() and headers() live in src/middleware.ts, which runs as an
  // external edge middleware via open-next.config.ts (cloudflare-edge wrapper)
  // and is verified working in production.
  //
  // IMPORTANT: do NOT add `export const runtime = 'edge'` to app routes.
  // @opennextjs/cloudflare 1.x edge-routes are broken in production (500s);
  // all routes must run on the default Node.js runtime (nodejs_compat).
  //
  // NOTE: no serverExternalPackages needed - externalized deps cannot be
  // resolved at runtime inside a workerd bundle; esbuild bundling works.
};

export default nextConfig;
