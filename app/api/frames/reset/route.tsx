import { NextRequest, NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SITE_URL}/api/images/input" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:input:text" content="Enter birth date (YYYY-MM-DD)" />
    <meta property="fc:frame:button:1" content="Calculate Numbers" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:post_url" content="${SITE_URL}/api/frames" />
    <title>Numerology Calculator</title>
  </head>
  <body>
    <h1>Numerology Calculator</h1>
    <p>Enter your birth date to discover your numbers!</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
