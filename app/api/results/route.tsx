import { NextRequest, NextResponse } from 'next/server';
import { calculateLifePath } from '@/app/lib/numerology';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dob = body.untrustedData?.inputText || '';
    
    let imageUrl = `${SITE_URL}/api/images/input`;
    let buttons = [
      { content: 'Try Again', action: 'post', target: `${SITE_URL}/api/input` }
    ];
    
    if (dob && /^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      try {
        const lifePath = calculateLifePath(dob);
        imageUrl = `${SITE_URL}/api/images/results?dob=${encodeURIComponent(dob)}&lifePath=${lifePath}`;
        
        buttons = [
          { content: '🔄 Calculate Again', action: 'post', target: `${SITE_URL}/api/input` },
          { content: '🏠 Home', action: 'post', target: `${SITE_URL}/api/frames` },
        ];
      } catch (error) {
        console.error('Calculation error:', error);
      }
    }
    
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:button:1" content="${buttons[0].content}" />
    <meta property="fc:frame:button:1:action" content="${buttons[0].action}" />
    <meta property="fc:frame:button:1:target" content="${buttons[0].target}" />
    ${buttons[1] ? `
    <meta property="fc:frame:button:2" content="${buttons[1].content}" />
    <meta property="fc:frame:button:2:action" content="${buttons[1].action}" />
    <meta property="fc:frame:button:2:target" content="${buttons[1].target}" />
    ` : ''}
    <title>Your Results</title>
  </head>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error:', error);
    
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SITE_URL}/api/images/input" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:button:1" content="Try Again" />
    <meta property="fc:frame:post_url" content="${SITE_URL}/api/input" />
  </head>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}