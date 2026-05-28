import { ImageResponse } from 'next/og';
import { SLUG_TO_CONFIG } from '@/lib/calculator-routes';

// Image metadata
export const alt = 'TheTaxCalc Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image generation
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

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0f1e',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 60%)',
          padding: 60,
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 20px',
            borderRadius: 999,
            border: '1px solid rgba(16,185,129,0.4)',
            background: 'rgba(16,185,129,0.1)',
            color: '#10b981',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: 'sans-serif',
            marginBottom: 24,
          }}
        >
          {categoryLabel}
        </div>

        {/* Main Heading */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 16,
            fontFamily: 'sans-serif',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.65)',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 800,
            fontFamily: 'sans-serif',
          }}
        >
          {description}
        </div>

        {/* Brand */}
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid rgba(16,185,129,0.4)',
              background: 'rgba(16,185,129,0.1)',
            }}
          >
            <span style={{ color: '#10b981', fontSize: 20, fontWeight: 900, fontFamily: 'sans-serif' }}>
              T
            </span>
          </div>
          <span style={{ color: '#10b981', fontSize: 20, fontWeight: 700, fontFamily: 'sans-serif' }}>
            TheTaxCalc
          </span>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 16,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'sans-serif',
          }}
        >
          100% Free · Updated for 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
