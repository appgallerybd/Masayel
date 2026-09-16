import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

const MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET() {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const snap = await adminDb.collection(COLLECTIONS.categories).orderBy("order").get();
  return Response.json(snap.docs.map((d) => d.data()));
}

function slugify(text: string) {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  if (!body.name) {
    return Response.json({ error: "নাম প্রয়োজন" }, { status: 400 });
  }

  const slug = slugify(body.name);
  const snap = await adminDb.collection(COLLECTIONS.categories).count().get();
  const record = { slug, name: body.name, order: snap.data().count + 1 };

  await adminDb.collection(COLLECTIONS.categories).doc(slug).set(record);
  return Response.json(record);
}
