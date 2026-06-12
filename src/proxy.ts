import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  // Check for ALL possible NextAuth / Auth.js token variations
  const sessionToken =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("__Secure-next-auth.session-token")

  const { pathname } = request.nextUrl

  // Rule 1: If logged in, block them from /auth pages
  if (pathname.startsWith("/auth")) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Rule 2: If logged out, block them from /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"]
}