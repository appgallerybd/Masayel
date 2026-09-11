import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// রোল-ভিত্তিক পেজ যাদের /admin দেখার অনুমতি আছে
const ALLOWED_ADMIN_ROLES = ["superadmin", "admin", "moderator"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session")?.value;

    // TODO: পরের ধাপে — session cookie ভেরিফাই করে role বের করা হবে
    // (firebase-admin দিয়ে verifySessionCookie, তারপর users কালেকশন থেকে role)
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
