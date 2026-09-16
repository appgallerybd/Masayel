import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idToken = typeof body?.idToken === "string" ? body.idToken : "";

    if (!idToken) {
      return Response.json({ error: "idToken প্রয়োজন" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const userRef = adminDb.collection("users").doc(decoded.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const email = (decoded.email ?? "").trim().toLowerCase();
      const inviteRef = email
        ? adminDb.collection("users").doc(`invite:${email}`)
        : null;
      const inviteDoc = inviteRef ? await inviteRef.get() : null;
      const invite = inviteDoc?.exists ? inviteDoc.data() : null;

      await userRef.set({
        uid: decoded.uid,
        email: decoded.email ?? invite?.email ?? "",
        name: decoded.name ?? invite?.name ?? decoded.email ?? "",
        role: invite?.role ?? "user",
        bookmarks: invite?.bookmarks ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (inviteDoc?.exists && inviteRef) {
        await inviteRef.delete();
      }
    } else {
      await userRef.set(
        {
          email: decoded.email ?? userDoc.data()?.email ?? "",
          name: decoded.name ?? userDoc.data()?.name ?? "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
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
