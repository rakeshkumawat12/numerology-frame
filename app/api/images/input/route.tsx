import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 50%, #1a1a2e 100%)',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <h1 style={{ fontSize: '72px', margin: 0, fontWeight: 'bold' }}>
          Enter Your Birth Date
        </h1>
        <p style={{ fontSize: '36px', opacity: 0.7, marginTop: '30px' }}>
          Format: YYYY-MM-DD
        </p>
        <div
          style={{
            marginTop: '60px',
            fontSize: '28px',
            opacity: 0.5,
            border: '2px solid rgba(255,255,255,0.3)',
            padding: '20px 40px',
            borderRadius: '15px',
          }}
        >
          Example: 1990-01-15
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}