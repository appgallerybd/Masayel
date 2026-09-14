import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

const MASALA_MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const doc = await adminDb.collection(COLLECTIONS.masala).doc(params.slug).get();
  if (!doc.exists) return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });

  return Response.json(doc.data());
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  const docRef = adminDb.collection(COLLECTIONS.masala).doc(params.slug);
  const existing = await docRef.get();

  if (!existing.exists) {
    return Response.json({ error: "পাওয়া যায়নি" }, { status: 404 });
  }

  const updated = {
    ...existing.data(),
    title: body.title,
    content: body.content,
    categoryId: body.categoryId,
    tags: body.tags ?? [],
    quranRefs: body.quranRefs ?? [],
    hadithRefs: body.hadithRefs ?? [],
    fiqhSchool: body.fiqhSchool,
    scholarId: body.scholarId,
    status: body.status,
    updatedAt: new Date().toISOString(),
  };

  await docRef.set(updated);
  return Response.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  await adminDb.collection(COLLECTIONS.masala).doc(params.slug).delete();
  return Response.json({ ok: true });
}
