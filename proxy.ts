// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Check for your auth cookie or token
  const accessToken = request.cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
  )?.value;
  const refreshToken = request.cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN as string,
  )?.value;

  // If no token and trying to access dashboard, redirect to login
  if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    accessToken &&
    refreshToken &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Config to specify which paths this middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
