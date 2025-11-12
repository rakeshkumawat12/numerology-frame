import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { calculateMulank, calculateDestinyNumber, getNumerologyInsights } from '@/app/lib/numerology';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dob = searchParams.get('dob') || '';

  let mulank = 1;
  let destinyNumber = 1;
  let mulankInsights = getNumerologyInsights(1);
  let destinyInsights = getNumerologyInsights(1);

  if (dob) {
    try {
      mulank = calculateMulank(dob);
      destinyNumber = calculateDestinyNumber(dob);
      mulankInsights = getNumerologyInsights(mulank);
      destinyInsights = getNumerologyInsights(destinyNumber);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 50%, #1a1a2e 100%)',
          color: 'white',
          fontFamily: 'system-ui',
          padding: '80px',
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '30px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Your Numerology
            <br />
            Numbers
          </h1>
          <div style={{ fontSize: '24px', opacity: 0.6, display: 'flex' }}>
            📅 {dob}
          </div>
        </div>

        {/* Right column - Cards */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '35px',
            justifyContent: 'center',
          }}
        >
          {/* Mulank Card */}
          <div
            style={{
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '24px',
              padding: '35px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '32px', display: 'flex', fontWeight: 'bold' }}>
              Mulank (Root): {mulank}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.8, display: 'flex', fontWeight: 'bold' }}>
              {mulankInsights.title}
            </div>
            <div style={{ fontSize: '18px', opacity: 0.6, display: 'flex' }}>
              {mulankInsights.desc}
            </div>
          </div>

          {/* Destiny Card */}
          <div
            style={{
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '24px',
              padding: '35px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '32px', display: 'flex', fontWeight: 'bold' }}>
              Destiny Number: {destinyNumber}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.8, display: 'flex', fontWeight: 'bold' }}>
              {destinyInsights.title}
            </div>
            <div style={{ fontSize: '18px', opacity: 0.6, display: 'flex' }}>
              {destinyInsights.desc}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}