import { NextRequest, NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SITE_URL}/api/images/input" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:input:text" content="Enter your birth date (YYYY-MM-DD)" />
    <meta property="fc:frame:button:1" content="Submit" />
    <meta property="fc:frame:button:2" content="◀ Back" />
    <meta property="fc:frame:post_url" content="${SITE_URL}/api/results" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:2:target" content="${SITE_URL}/api/frames" />
    <title>Enter Birth Date</title>
  </head>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}