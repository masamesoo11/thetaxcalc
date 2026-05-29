import { NextResponse } from 'next/server';
import { SLUG_TO_CONFIG } from '@/lib/calculator-routes';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'TheTaxCalc Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/svg+xml';

// Image generation — lightweight SVG (no @vercel/og WASM dependency)
export default async function Image({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  const title = config?.h1 || 'Tax Calculator';
  const description = config?.metaDesc?.split('.')[0] || 'Free 2026 tax calculator by TheTaxCalc';
  const category = config?.category || 'finance';
  const categoryLabel = category === 'paycheck' ? 'PAYCHECK' : category === 'mortgage' ? 'MORTGAGE' : category === 'retirement' ? 'RETIREMENT' : category === 'investment' ? 'INVESTMENT' : category === 'business' ? 'BUSINESS' : 'FINANCE';

  // Truncate title for SVG display
  const displayTitle = title.length > 40 ? title.substring(0, 37) + '...' : title;
  const displayDesc = description.length > 70 ? description.substring(0, 67) + '...' : description;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="glow" cx="50%" cy="0%" r="60%">
        <stop offset="0%" style="stop-color:rgba(16,185,129,0.15)"/>
        <stop offset="100%" style="stop-color:transparent"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#0a0f1e"/>
    <rect width="1200" height="630" fill="url(#glow)"/>

    <!-- Category badge -->
    <rect x="490" y="80" width="220" height="40" rx="20" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
    <text x="600" y="106" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="700" font-size="14" letter-spacing="2">${categoryLabel}</text>

    <!-- Main Heading -->
    <text x="600" y="240" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="56">${escapeXml(displayTitle)}</text>

    <!-- Description -->
    <text x="600" y="310" text-anchor="middle" fill="rgba(255,255,255,0.65)" font-family="sans-serif" font-weight="400" font-size="22">${escapeXml(displayDesc)}</text>

    <!-- Brand -->
    <rect x="536" y="390" width="36" height="36" rx="8" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
    <text x="554" y="416" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="900" font-size="20">T</text>
    <text x="590" y="414" fill="#10b981" font-family="sans-serif" font-weight="700" font-size="20">TheTaxCalc</text>

    <!-- Bottom tagline -->
    <text x="600" y="480" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-family="sans-serif" font-weight="400" font-size="16">100% Free · Updated for 2026</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
