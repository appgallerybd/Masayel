import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// এটা শুধু দ্রুত, Edge-সাইড প্রাথমিক চেক — "session" কুকি আছে কিনা দেখে।
// আসল যাচাই (কুকি বৈধ কিনা + রোল কী) app/(admin)/admin/(protected)/layout.tsx
// এ firebase-admin দিয়ে হয় (Node.js রানটাইমে, যেটা middleware/Edge-এ চলে না)।
// এই middleware শুধু defense-in-depth হিসেবে দ্রুত রিডাইরেক্ট করে।
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
