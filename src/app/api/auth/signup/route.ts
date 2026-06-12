import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 })
  }

  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) {
    return Response.json({ error: "Email already in use" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  await User.create({ email, password: hashed })

  return Response.json({ success: true }, { status: 201 })
}