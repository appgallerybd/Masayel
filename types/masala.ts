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
  content: string; // markdown/rich-text
  categoryId: string;
  tags: string[];
  quranRefs: QuranReference[];
  hadithRefs: HadithReference[];
  fiqhSchool?: FiqhSchool;
  scholarId?: string;
  status: "draft" | "published";
  views: number;
  createdAt: string;
  updatedAt: string;
}
