import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'TheTaxCalc — Free 2026 Paycheck & Mortgage Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image generation
export default async function Image() {
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
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              border: '2px solid rgba(16,185,129,0.4)',
              background: 'rgba(16,185,129,0.1)',
              marginRight: 16,
            }}
          >
            <span style={{ color: '#10b981', fontSize: 36, fontWeight: 900, fontFamily: 'sans-serif' }}>
              T
            </span>
          </div>
          <span style={{ color: '#10b981', fontSize: 32, fontWeight: 700, fontFamily: 'sans-serif' }}>
            TheTaxCalc
          </span>
        </div>

        {/* Main Heading */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 20,
            fontFamily: 'sans-serif',
          }}
        >
          Free 2026 Tax Calculators
        </div>

        {/* Sub Heading */}
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 800,
            fontFamily: 'sans-serif',
          }}
        >
          Paycheck · Mortgage · 401(k) · Capital Gains · Self-Employment
        </div>

        {/* State badges */}
        <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
          {['IL 4.95%', 'TX 0%', 'FL 0%', 'CA 1-13.3%', 'NY 4-10.9%'].map(
            (state) => (
              <div
                key={state}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: '1px solid rgba(16,185,129,0.3)',
                  background: 'rgba(16,185,129,0.08)',
                  color: '#10b981',
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: 'sans-serif',
                }}
              >
                {state}
              </div>
            )
          )}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'sans-serif',
          }}
        >
          100% Free · No Sign-Up Required · Updated for 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
