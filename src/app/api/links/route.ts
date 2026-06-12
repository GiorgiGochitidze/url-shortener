import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Link } from "@/lib/models/Link";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url) return Response.json({ error: "URL is required" }, { status: 400 });

  await connectDB();

  const slug = nanoid(5);
  const link = await Link.create({
    slug,
    originalUrl: url,
    userId: session.user.id,
  });

  return Response.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    link,
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const links = await Link.find({ userId: session.user.id });
  return Response.json({ links });
}
