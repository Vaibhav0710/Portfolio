import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Construct the payload for Web3Forms
    const payload = {
      ...body,
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: body._subject || "New Portfolio Message",
      from_name: "Portfolio Contact Form"
    };

    // Server-to-Server forward to Web3Forms API
    // We supply a real browser User-Agent so Cloudflare doesn't flag this server-side request as a bot
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error("Web3Forms Upstream Error:", errorText);
      return NextResponse.json({ error: "Failed to forward transmission" }, { status: 502 });
    }
    
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
