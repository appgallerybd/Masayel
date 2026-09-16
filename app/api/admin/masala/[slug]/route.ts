import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";
import { masalaSchema } from "@/lib/validators";

const MASALA_MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const doc = await adminDb.collection(COLLECTIONS.masala).doc(params.slug).get();
  if (!doc.exists) return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });

  return Response.json(doc.data(), { headers: { "Cache-Control": "private, no-store" } });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "অবৈধ JSON" }, { status: 400 });
  }

  const result = masalaSchema.safeParse({ ...(body as object), slug: params.slug });
  if (!result.success) {
    return Response.json({ error: result.error.issues[0]?.message ?? "ভুল ইনপুট" }, { status: 400 });
  }

  const docRef = adminDb.collection(COLLECTIONS.masala).doc(params.slug);
  const existing = await docRef.get();
  if (!existing.exists) return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });

  const old = existing.data() ?? {};
  const updated = {
    ...old,
    ...result.data,
    id: old.id ?? params.slug,
    slug: params.slug,
    views: old.views ?? 0,
    createdAt: old.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await docRef.set(updated);
  return Response.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const docRef = adminDb.collection(COLLECTIONS.masala).doc(params.slug);
  const existing = await docRef.get();
  if (!existing.exists) return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });

  await docRef.delete();
  return Response.json({ ok: true });
}
