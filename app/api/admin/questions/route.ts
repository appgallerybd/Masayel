import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

const MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET() {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const snap = await adminDb.collection(COLLECTIONS.questions).orderBy("createdAt", "desc").get();
  return Response.json(snap.docs.map((d) => d.data()));
}
