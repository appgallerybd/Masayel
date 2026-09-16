import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

const MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  await adminDb.collection(COLLECTIONS.questions).doc(params.id).update({ status: body.status });
  return Response.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRole([...MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  await adminDb.collection(COLLECTIONS.questions).doc(params.id).delete();
  return Response.json({ ok: true });
}
