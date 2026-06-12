import { Link } from "@/lib/models/Link";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } 
) {
  const { slug } = await params;

  try {
    await connectDB();

    // 1. Fetch link configurations first to analyze dates safely
    const link = await Link.findOne({ slug });

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Evaluate if the link is past its expiration deadline
    const isExpired = link.expiresAt ? new Date() > new Date(link.expiresAt) : false;

    if (link.status === "Inactive" || isExpired) {
      // Bounce to the homepage or custom error screen because the link is dead
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. If valid, append click metadata details securely
    await Link.updateOne(
      { _id: link._id },
      {
        $push: {
          clicks: {
            timestamp: new Date(),
            referrer: req.headers.get("referer") ?? "Direct",
            userAgent: req.headers.get("user-agent") ?? "Unknown",
          },
        },
      }
    );

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