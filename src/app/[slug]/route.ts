import { Link } from "@/lib/models/Link";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  try {
    await connectDB();

    const link = await Link.findOneAndUpdate(
      { slug: slug },
      {
        $push: {
          clicks: {
            timestamp: new Date(),
            referrer: req.headers.get("referer") ?? "Direct",
            userAgent: req.headers.get("user-agent") ?? "Unknown",
          },
        },
      },
      { new: true }
    );

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let targetUrl = link.originalUrl.trim();

    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    return NextResponse.redirect(targetUrl);

  } catch (error) {
    console.error("Localhost redirect routing error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
