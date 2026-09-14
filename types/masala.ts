export type FiqhSchool = "হানাফি" | "শাফেয়ি" | "মালেকি" | "হাম্বলি";

export interface QuranReference {
  surah: string;
  ayah: string;
  text: string;
}

export interface HadithReference {
  source: string; // যেমন: সহীহ বুখারী
  number: string;
  text: string;
}

export interface Masala {
  id: string;
  slug: string;
  title: string;
  content: string[]; // প্যারাগ্রাফ ধরে ধরে
  categoryId: string; // = category ডকুমেন্টের slug/id
  tags: string[];
  quranRefs: QuranReference[];
  hadithRefs: HadithReference[];
  fiqhSchool?: FiqhSchool;
  scholarId?: string; // = scholar ডকুমেন্টের slug/id
  status: "draft" | "published";
  views: number;
  createdAt: string;
  updatedAt: string;
}
