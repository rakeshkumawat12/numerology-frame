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
          position: 'relative',
        }}
      >
        {/* Cosmic circles */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            border: '3px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            border: '3px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: '700px',
              fontWeight: 'bold',
            }}
          >
            What does your birth date reveal?
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '48px',
              opacity: 0.6,
            }}
          >
            ✧ ☽ ✧
          </div>
        </div>

        <p
          style={{
            position: 'absolute',
            top: '50px',
            fontSize: '20px',
            opacity: 0.5,
            margin: 0,
          }}
        >
          Mystical gradient background with cosmic numerology symbols
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}