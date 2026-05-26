import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          border: '2px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span style={{ color: '#10b981', fontSize: 72, fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1 }}>
            T
          </span>
          <span style={{ color: 'rgba(16, 185, 129, 0.7)', fontSize: 18, fontWeight: 600, fontFamily: 'sans-serif', letterSpacing: 2 }}>
            YIELD
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
