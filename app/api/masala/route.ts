import { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Masala } from "@/types/masala";

export async function GET(request: NextRequest) {
  const slugsParam = request.nextUrl.searchParams.get("slugs");
  if (!slugsParam) return Response.json([]);

  const slugs = slugsParam.split(",").filter(Boolean).slice(0, 50);
  if (slugs.length === 0) return Response.json([]);

  const docs = await Promise.all(
    slugs.map((slug) => adminDb.collection(COLLECTIONS.masala).doc(slug).get())
  );

  const masala = docs
    .filter((d) => d.exists)
    .map((d) => d.data() as Masala)
    .filter((m) => m.status === "published");

  return Response.json(masala);
}
