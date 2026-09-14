import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000; // ৫ দিন (মিলিসেকেন্ডে)

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();

  if (!idToken) {
    return Response.json({ error: "idToken প্রয়োজন" }, { status: 400 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);

    // প্রথমবার সাইন-ইন করলে users ডকুমেন্ট না-ও থাকতে পারে — ডিফল্ট রোল
    // "user" দিয়ে তৈরি করে দেওয়া হচ্ছে। অ্যাডমিন প্যানেলে ঢোকার জন্য
    // superadmin থেকে ম্যানুয়ালি রোল আপগ্রেড করতে হবে (/admin/users থেকে)।
    const userRef = adminDb.collection("users").doc(decoded.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        uid: decoded.uid,
        email: decoded.email ?? "",
        name: decoded.name ?? decoded.email ?? "",
        role: "user",
        bookmarks: [],
        createdAt: new Date().toISOString(),
      });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    cookies().set("session", sessionCookie, {
      maxAge: SESSION_EXPIRES_IN / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "টোকেন যাচাই ব্যর্থ হয়েছে" }, { status: 401 });
  }
}

export async function DELETE() {
  cookies().delete("session");
  return Response.json({ ok: true });
}
