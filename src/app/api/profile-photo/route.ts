// Serves the profile photo from Google Drive through this domain (avoids Drive's hotlink and cookie issues).
// The result is cached for a day so the photo isn't fetched from Google on every page view.
export const revalidate = 86400;

export async function GET() {
  try {
    const response = await fetch("https://lh3.googleusercontent.com/d/1oxR5wRxnPa4c24XvqsDkt1h-IQFfOw_j", {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error(`Google Drive responded with status: ${response.status}`);
      return new Response("Failed to fetch profile photo from source", { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Profile photo proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
