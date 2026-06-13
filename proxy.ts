// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookieValue } from "./util/common";

export function proxy(request: NextRequest) {
  // Check for your auth cookie or token
  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
  )?.value;

  // If no token and trying to access dashboard, redirect to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Config to specify which paths this middleware runs on
export const config = {
  matcher: ["/dashboard/:path*"],
};
