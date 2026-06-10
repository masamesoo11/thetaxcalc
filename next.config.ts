import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://0.0.0.0:3000', 'http://21.0.11.18:3000', 'http://21.0.12.240:3000', 'http://21.0.14.77:3000', 'http://127.0.0.1:81', 'http://localhost:81'],
  async redirects() {
    return [
      {
        // SEO safety net: redirect the old/incorrect slug to the correct one
        // WebSite Auditor reported /self-employment-calculator as 404 on 45 pages
        source: '/self-employment-calculator',
        destination: '/self-employment-tax-calculator',
        permanent: true, // 301 — tells search engines to update their index
      },
    ];
  },
  async headers() {
    return [
      {
        // All HTML pages (App Router routes without file extension)
        // Must come BEFORE the catch-all rule so it takes priority
        // This is critical: Next.js App Router pages like /mortgage-calculator
        // do NOT have .html extensions, so the rule below would never match them.
        source: '/:path((?!_next|api|admin|favicon|icon|logo|author|d4e5f6).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        // Static file extensions — allow CDN/browser caching for SEO performance
        // Google needs cacheable pages for efficient crawling & Core Web Vitals
        source: '/(.*)\\.(html|xml|txt|json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        // All pages — security headers (no Cache-Control here!)
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
      {
        // Static assets — long-term caching
        source: '/_next/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Static files (images, icons, etc.) — medium-term caching
        source: '/(.*)\\.(png|jpg|jpeg|svg|ico|webp|woff2|woff)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=31536000' },
        ],
      },
    ];
  },
};

export default nextConfig;
