import { NextRequest, NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SITE_URL}/api/images/landing" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:button:1" content="Launch App" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${SITE_URL}" />
    <title>Numerology Mini App</title>
  </head>
  <body>
    <h1>Numerology Mini App</h1>
    <p>Click "Launch App" to open the numerology mini app!</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}