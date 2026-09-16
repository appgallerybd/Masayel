import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

const MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const doc = await adminDb.collection(COLLECTIONS.scholars).doc(params.slug).get();
  if (!doc.exists) return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });
  return Response.json(doc.data());
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  await adminDb.collection(COLLECTIONS.scholars).doc(params.slug).update({
    name: body.name,
    designation: body.designation ?? "",
    bio: body.bio ?? "",
    credentials: body.credentials ?? "",
  });
  return Response.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  await adminDb.collection(COLLECTIONS.scholars).doc(params.slug).delete();
  return Response.json({ ok: true });
}
