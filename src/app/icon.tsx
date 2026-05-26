import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <span style={{ color: '#10b981', fontWeight: 900, fontFamily: 'sans-serif' }}>
          T
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
