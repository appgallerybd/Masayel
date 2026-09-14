import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requireRole } from "@/lib/admin-session";

export async function GET() {
  const auth = await requireRole(["superadmin"]);
  if (auth instanceof Response) return auth;

  const snap = await adminDb.collection(COLLECTIONS.users).get();
  return Response.json(snap.docs.map((d) => d.data()));
}

// নতুন ইউজার/রোল "ইনভাইট" রেকর্ড — আসল Firebase Auth অ্যাকাউন্ট তৈরি হবে
// যখন এই ইমেইল দিয়ে প্রথমবার সাইন-ইন করা হবে (তখন /api/session এই
// ডকুমেন্ট না পেয়ে ডিফল্ট রোল দিয়ে নতুন একটা বানাতো — কিন্তু আমরা এখানে
// আগে থেকেই রোলসহ ডকুমেন্ট বসিয়ে রাখছি, ফলে প্রথম সাইন-ইনেই সঠিক
// রোল পাবে)।
export async function POST(request: NextRequest) {
  const auth = await requireRole(["superadmin"]);
  if (auth instanceof Response) return auth;

  const body = await request.json();
  if (!body.email || !body.role) {
    return Response.json({ error: "email ও role প্রয়োজন" }, { status: 400 });
  }

  // ইমেইল দিয়ে খোঁজা — uid তখনই পাওয়া যাবে যখন ইউজার প্রথমবার সাইন-ইন করবে।
  // ততক্ষণ একটা প্লেসহোল্ডার ডকুমেন্ট ইমেইলকে আইডি হিসেবে ব্যবহার করে রাখা হচ্ছে,
  // প্রথম সাইন-ইনে /api/session সঠিক uid দিয়ে আসল ডকুমেন্টে রূপান্তর করবে।
  const docId = `invite:${body.email}`;
  const record = {
    uid: docId,
    name: body.name ?? "",
    email: body.email,
    role: body.role,
    bookmarks: [],
    pending: true,
  };

  await adminDb.collection(COLLECTIONS.users).doc(docId).set(record);
  return Response.json(record);
}
