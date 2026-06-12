import { Link } from "@/lib/models/Link";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  await connectDB();

  const link = await Link.findOneAndUpdate({ slug: params.slug },{
    $push: {
        clicks: {
            timestamp: new Date(),
            referrer: req.headers.get("referer") ?? "",
            userAgent: req.headers.get("user-agent") ?? ""
        }
    }
  });
  if (!link) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  redirect(link.originalUrl)
}
