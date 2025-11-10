import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { calculateLifePath, getNumerologyInsights } from '@/app/lib/numerology';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dob = searchParams.get('dob') || '';
  
  let lifePath = 1;
  let insights = getNumerologyInsights(1);
  
  if (dob) {
    try {
      lifePath = calculateLifePath(dob);
      insights = getNumerologyInsights(lifePath);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const destiny = (lifePath + 3) % 9 || 9;
  const soul = (lifePath + destiny) % 9 || 9;

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
            Your Cosmic
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
          {/* Life Path Card */}
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
            <div style={{ fontSize: '28px', display: 'flex' }}>
              • Life Path: {lifePath}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.8, display: 'flex', fontWeight: 'bold' }}>
              {insights.title}
            </div>
            <div style={{ fontSize: '18px', opacity: 0.6, display: 'flex' }}>
              {insights.desc}
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
            <div style={{ fontSize: '28px', display: 'flex' }}>
              • Destiny: {destiny}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.7, display: 'flex' }}>
              Your Life Purpose
            </div>
          </div>

          {/* Soul Card */}
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
            <div style={{ fontSize: '28px', display: 'flex' }}>
              • Soul Urge: {soul}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.7, display: 'flex' }}>
              Inner Desires
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