import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to /kz
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/kz", request.url));
  }

  // Check if pathname starts with /kz or /ru
  const pathnameHasLocale = pathname.startsWith("/kz") || pathname.startsWith("/ru");

  if (!pathnameHasLocale) {
    // Redirect to /kz if no locale is present
    return NextResponse.redirect(new URL(`/kz${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
