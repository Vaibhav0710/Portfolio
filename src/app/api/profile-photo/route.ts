import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the image from Google Drive server-side
    // This avoids all browser-level cookie/login conflicts and hotlink blocks.
    const response = await fetch("https://lh3.googleusercontent.com/d/1oxR5wRxnPa4c24XvqsDkt1h-IQFfOw_j", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      cache: 'no-store', // Ensure it always fetches the fresh version from Google Drive
    });

    if (!response.ok) {
      console.error(`Google Drive responded with status: ${response.status}`);
      return new Response("Failed to fetch profile photo from source", { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error("Profile photo proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
