import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { questionSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = questionSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.issues[0]?.message ?? "ভুল ইনপুট" }, { status: 400 });
  }

  const docRef = adminDb.collection(COLLECTIONS.questions).doc();
  await docRef.set({
    id: docRef.id,
    questionText: result.data.questionText,
    categorySlug: result.data.categorySlug,
    askedByName: result.data.askedByName || null,
    askedByEmail: result.data.askedByEmail || null,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return Response.json({ ok: true, id: docRef.id });
}
