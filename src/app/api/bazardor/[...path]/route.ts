const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { path } = await params;
  const upstreamUrl = new URL(
    path.map((segment) => encodeURIComponent(segment)).join("/"),
    `${API_BASE_URL}/`,
  );
  upstreamUrl.search = new URL(request.url).search;

  try {
    const upstream = await fetch(upstreamUrl, { next: { revalidate: 60 } });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return Response.json({ error: "বাজারদরের API সাময়িকভাবে পাওয়া যাচ্ছে না" }, { status: 502 });
  }
}
