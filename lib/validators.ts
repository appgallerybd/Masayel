import { z } from "zod";

export const questionSchema = z.object({
  questionText: z
    .string()
    .min(15, "প্রশ্নটি অন্তত ১৫ অক্ষরের হতে হবে")
    .max(1000, "প্রশ্নটি ১০০০ অক্ষরের বেশি হতে পারবে না"),
  categorySlug: z.string().min(1, "একটি ক্যাটাগরি নির্বাচন করুন"),
  askedByName: z.string().max(100).optional().or(z.literal("")),
  askedByEmail: z
    .string()
    .email("সঠিক ইমেইল দিন")
    .optional()
    .or(z.literal("")),
});

export type QuestionInput = z.infer<typeof questionSchema>;
