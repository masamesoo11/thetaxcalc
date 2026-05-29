import { NextResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = { width: 180, height: 180 };
export const contentType = 'image/svg+xml';

// Image generation — lightweight SVG (no @vercel/og WASM dependency)
export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0f1e"/>
        <stop offset="100%" style="stop-color:#1a2332"/>
      </linearGradient>
    </defs>
    <rect width="180" height="180" rx="36" fill="url(#bg)" stroke="rgba(16,185,129,0.3)" stroke-width="2"/>
    <text x="90" y="108" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="900" font-size="72">T</text>
    <text x="90" y="138" text-anchor="middle" fill="rgba(16,185,129,0.7)" font-family="sans-serif" font-weight="600" font-size="18" letter-spacing="2">YIELD</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
