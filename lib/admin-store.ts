import { MASALA_DETAILS, MockMasalaDetail } from "@/lib/mock-data";

// ⚠️ Firestore এখনো ওয়্যার করা হয়নি, তাই অ্যাডমিন প্যানেল থেকে করা
// অ্যাড/এডিট/ডিলিট localStorage-এ রাখা হচ্ছে যাতে ডেমো হিসেবে আসলেই কাজ করে।
// Firestore যুক্ত হলে এই ফাইলের ফাংশনগুলো addDoc/updateDoc/deleteDoc দিয়ে
// প্রতিস্থাপিত হবে — বাইরে থেকে ব্যবহারের ধরন (function signature) একই থাকবে।

const STORAGE_KEY = "admin:masala";

function readStore(): Record<string, MockMasalaDetail> {
  if (typeof window === "undefined") return MASALA_DETAILS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MASALA_DETAILS));
      return MASALA_DETAILS;
    }
    return JSON.parse(raw);
  } catch {
    return MASALA_DETAILS;
  }
}

function writeStore(data: Record<string, MockMasalaDetail>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAllMasala(): MockMasalaDetail[] {
  return Object.values(readStore());
}

export function getMasalaBySlug(slug: string): MockMasalaDetail | undefined {
  return readStore()[slug];
}

export function upsertMasala(masala: MockMasalaDetail) {
  const store = readStore();
  store[masala.slug] = masala;
  writeStore(store);
}

export function deleteMasala(slug: string) {
  const store = readStore();
  delete store[slug];
  writeStore(store);
}
