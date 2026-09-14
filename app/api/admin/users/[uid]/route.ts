import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

export async function PUT(request: NextRequest, { params }: { params: { uid: string } }) {
  const auth = await requireRole(["superadmin"]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  await adminDb.collection(COLLECTIONS.users).doc(params.uid).update({ role: body.role });
  return Response.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { uid: string } }) {
  const auth = await requireRole(["superadmin"]);
  if (auth instanceof Response) return auth;

  await adminDb.collection(COLLECTIONS.users).doc(params.uid).delete();
  return Response.json({ ok: true });
}
