import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";
import { Masala } from "@/types/masala";

const MASALA_MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET() {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const snap = await adminDb.collection(COLLECTIONS.masala).orderBy("createdAt", "desc").get();
  return Response.json(snap.docs.map((d) => d.data()));
}

export async function POST(request: NextRequest) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  const slug: string = body.slug;

  if (!slug) {
    return Response.json({ error: "slug প্রয়োজন" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const record: Masala = {
    id: slug,
    slug,
    title: body.title,
    content: body.content,
    categoryId: body.categoryId,
    tags: body.tags ?? [],
    quranRefs: body.quranRefs ?? [],
    hadithRefs: body.hadithRefs ?? [],
    fiqhSchool: body.fiqhSchool,
    scholarId: body.scholarId,
    status: body.status ?? "draft",
    views: 0,
    createdAt: now,
    updatedAt: now,
  };

  await adminDb.collection(COLLECTIONS.masala).doc(slug).set(record);
  return Response.json(record);
}
