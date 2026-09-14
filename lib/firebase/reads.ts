import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Masala } from "@/types/masala";
import { Category } from "@/types/category";
import { Scholar } from "@/types/scholar";

// এই ফাইলের ফাংশনগুলো শুধু Server Component-এ ("use client" ছাড়া
// page.tsx/layout.tsx) ব্যবহার করা যাবে — কারণ firebase-admin Node.js
// রানটাইম চায়, ব্রাউজারে চলবে না।

export async function getCategories(): Promise<Category[]> {
  const snap = await adminDb.collection(COLLECTIONS.categories).orderBy("order").get();
  return snap.docs.map((d) => d.data() as Category);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const doc = await adminDb.collection(COLLECTIONS.categories).doc(slug).get();
  return doc.exists ? (doc.data() as Category) : null;
}

export async function getPublishedMasala(limit = 20): Promise<Masala[]> {
  const snap = await adminDb
    .collection(COLLECTIONS.masala)
    .where("status", "==", "published")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => d.data() as Masala);
}

export async function getMasalaByCategory(categorySlug: string): Promise<Masala[]> {
  const snap = await adminDb
    .collection(COLLECTIONS.masala)
    .where("status", "==", "published")
    .where("categoryId", "==", categorySlug)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => d.data() as Masala);
}

export async function getMasalaBySlug(slug: string): Promise<Masala | null> {
  const doc = await adminDb.collection(COLLECTIONS.masala).doc(slug).get();
  if (!doc.exists) return null;
  const masala = doc.data() as Masala;
  return masala.status === "published" ? masala : null;
}

export async function getMasalaByScholar(scholarSlug: string): Promise<Masala[]> {
  const snap = await adminDb
    .collection(COLLECTIONS.masala)
    .where("status", "==", "published")
    .where("scholarId", "==", scholarSlug)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => d.data() as Masala);
}

export async function getScholars(): Promise<Scholar[]> {
  const snap = await adminDb.collection(COLLECTIONS.scholars).get();
  return snap.docs.map((d) => d.data() as Scholar);
}

export async function getScholarBySlug(slug: string): Promise<Scholar | null> {
  const doc = await adminDb.collection(COLLECTIONS.scholars).doc(slug).get();
  return doc.exists ? (doc.data() as Scholar) : null;
}
