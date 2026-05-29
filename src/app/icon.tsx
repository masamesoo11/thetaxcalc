import { NextResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = { width: 32, height: 32 };
export const contentType = 'image/svg+xml';

// Image generation — lightweight SVG (no @vercel/og WASM dependency)
export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0f1e"/>
        <stop offset="100%" style="stop-color:#1a2332"/>
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="6" fill="url(#bg)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
    <text x="16" y="22" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="900" font-size="20">T</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
