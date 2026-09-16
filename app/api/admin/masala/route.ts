import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";
import { masalaSchema } from "@/lib/validators";
import { Masala } from "@/types/masala";

const MASALA_MANAGER_ROLES = ["superadmin", "admin", "moderator"] as const;

export async function GET() {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  const snap = await adminDb.collection(COLLECTIONS.masala).orderBy("createdAt", "desc").get();
  return Response.json(snap.docs.map((d) => d.data()), {
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireRole([...MASALA_MANAGER_ROLES]);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "অবৈধ JSON" }, { status: 400 });
  }

  const result = masalaSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: result.error.issues[0]?.message ?? "ভুল ইনপুট" }, { status: 400 });
  }

  const input = result.data;
  const docRef = adminDb.collection(COLLECTIONS.masala).doc(input.slug);
  const existing = await docRef.get();
  if (existing.exists) {
    return Response.json({ error: "এই slug ইতিমধ্যে ব্যবহৃত হয়েছে" }, { status: 409 });
  }

  const now = new Date().toISOString();
  const record: Masala = {
    id: input.slug,
    ...input,
    views: 0,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.create(record);
  return Response.json(record, { status: 201 });
}
