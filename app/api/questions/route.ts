import { NextRequest } from "next/server";
import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { questionSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  if (!isFirebaseConfigured()) {
    return Response.json(
      { error: "প্রশ্ন জমা দেওয়ার ব্যবস্থা সাময়িকভাবে বন্ধ আছে। Firebase সংযুক্ত হলে আবার চেষ্টা করুন।" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "সঠিক JSON তথ্য পাঠান।" }, { status: 400 });
  }

  const result = questionSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: result.error.issues[0]?.message ?? "ভুল ইনপুট" }, { status: 400 });
  }

  try {
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
  } catch {
    return Response.json(
      { error: "প্রশ্নটি এখন জমা দেওয়া যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
      { status: 503 }
    );
  }
}
