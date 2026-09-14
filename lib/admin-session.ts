import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { UserRole } from "@/types/user";

export interface SessionUser {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}

/**
 * "session" কুকি (httpOnly) যাচাই করে, তারপর Firestore-এর users/{uid}
 * ডকুমেন্ট থেকে রোল বের করে। কুকি অবৈধ বা ডকুমেন্ট না থাকলে null।
 * এটা শুধু Node.js রানটাইমে চলবে (Route Handler / Server Component) —
 * middleware.ts (Edge) থেকে এটা import করা যাবে না।
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userDoc = await adminDb.collection("users").doc(decoded.uid).get();

    if (!userDoc.exists) return null;

    const data = userDoc.data()!;
    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: data.name ?? "",
      role: data.role as UserRole,
    };
  } catch {
    return null;
  }
}

/**
 * API route হ্যান্ডলারে ব্যবহারের জন্য — নির্দিষ্ট রোল ছাড়া অ্যাক্সেস দিলে
 * একটা 401/403 Response রিটার্ন করে, নাহলে SessionUser রিটার্ন করে।
 * ব্যবহার: const auth = await requireRole(["superadmin","admin"]);
 *          if (auth instanceof Response) return auth;
 */
export async function requireRole(allowed: UserRole[]): Promise<SessionUser | Response> {
  const user = await getSessionUser();
  if (!user) {
    return Response.json({ error: "লগইন প্রয়োজন" }, { status: 401 });
  }
  if (!allowed.includes(user.role)) {
    return Response.json({ error: "এই কাজের অনুমতি নেই" }, { status: 403 });
  }
  return user;
}
