import { z } from "zod";

const nonEmptyString = (label: string, max: number) =>
  z.string().trim().min(1, `${label} প্রয়োজন`).max(max, `${label} ${max} অক্ষরের বেশি হতে পারবে না`);

export const questionSchema = z.object({
  questionText: z.string().trim().min(15, "প্রশ্নটি অন্তত ১৫ অক্ষরের হতে হবে").max(1000, "প্রশ্নটি ১০০০ অক্ষরের বেশি হতে পারবে না"),
  categorySlug: nonEmptyString("একটি ক্যাটাগরি", 120),
  askedByName: z.string().trim().max(100, "নাম ১০০ অক্ষরের বেশি হতে পারবে না").optional().or(z.literal("")),
  askedByEmail: z.string().trim().email("সঠিক ইমেইল দিন").max(254, "ইমেইল ২৫৪ অক্ষরের বেশি হতে পারবে না").optional().or(z.literal("")),
});

export const masalaSchema = z.object({
  slug: z.string().trim().min(2, "slug প্রয়োজন").max(160, "slug ১৬০ অক্ষরের বেশি হতে পারবে না").regex(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u, "slug সঠিক ফরম্যাটে দিন"),
  title: nonEmptyString("শিরোনাম", 300),
  content: z.array(z.string().trim().min(1, "খালি অনুচ্ছেদ রাখা যাবে না").max(10000, "অনুচ্ছেদ ১০,০০০ অক্ষরের বেশি হতে পারবে না")).min(1, "অন্তত একটি অনুচ্ছেদ প্রয়োজন").max(100, "সর্বোচ্চ ১০০টি অনুচ্ছেদ রাখা যাবে"),
  categoryId: nonEmptyString("ক্যাটাগরি", 120),
  tags: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  quranRefs: z.array(z.object({ surah: z.string(), ayah: z.string(), text: z.string() })).max(50).default([]),
  hadithRefs: z.array(z.object({ source: z.string(), number: z.string(), text: z.string() })).max(50).default([]),
  fiqhSchool: z.enum(["হানাফি", "শাফেয়ি", "মালেকি", "হাম্বলি"]).optional(),
  scholarId: z.string().trim().max(160).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type MasalaInput = z.infer<typeof masalaSchema>;
