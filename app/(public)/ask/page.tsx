"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { questionSchema } from "@/lib/validators";
import { Category } from "@/types/category";

type FieldErrors = Partial<Record<"questionText" | "categorySlug" | "askedByEmail", string>>;

export default function AskPage() {
  const [questionText, setQuestionText] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [askedByName, setAskedByName] = useState("");
  const [askedByEmail, setAskedByEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = questionSchema.safeParse({
      questionText,
      categorySlug,
      askedByName,
      askedByEmail,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      setErrors({ questionText: "প্রশ্ন পাঠাতে সমস্যা হয়েছে, আবার চেষ্টা করো।" });
      return;
    }

    setSubmitted(true);
    setQuestionText("");
    setCategorySlug("");
    setAskedByName("");
    setAskedByEmail("");
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl">প্রশ্ন জমা হয়েছে</h1>
        <p className="mt-3 text-ink-600">
          তোমার প্রশ্নটি পর্যালোচনার জন্য পাঠানো হয়েছে। যাচাই করে যথাযথ উত্তর
          প্রকাশ করা হবে ইনশাআল্লাহ।
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-emerald-700 hover:underline"
        >
          আরেকটি প্রশ্ন করুন
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl">প্রশ্ন করুন</h1>
      <p className="mt-1 text-ink-600">
        তোমার মাসআলা-সংক্রান্ত প্রশ্ন জমা দাও — যাচাইকৃত আলেমগণ উত্তর দেবেন
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="categorySlug" className="mb-1.5 block text-sm text-ink-600">
            সম্পর্কিত ক্যাটাগরি
          </label>
          <Select
            id="categorySlug"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
          >
            <option value="">ক্যাটাগরি নির্বাচন করুন</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          {errors.categorySlug && (
            <p className="mt-1 text-sm text-red-600">{errors.categorySlug}</p>
          )}
        </div>

        <div>
          <label htmlFor="questionText" className="mb-1.5 block text-sm text-ink-600">
            তোমার প্রশ্ন
          </label>
          <Textarea
            id="questionText"
            rows={5}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="বিস্তারিত লিখো, যাতে সঠিক উত্তর দেওয়া সহজ হয়..."
          />
          {errors.questionText && (
            <p className="mt-1 text-sm text-red-600">{errors.questionText}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="askedByName" className="mb-1.5 block text-sm text-ink-600">
              নাম (ঐচ্ছিক)
            </label>
            <Input
              id="askedByName"
              value={askedByName}
              onChange={(e) => setAskedByName(e.target.value)}
              placeholder="তোমার নাম"
            />
          </div>
          <div>
            <label htmlFor="askedByEmail" className="mb-1.5 block text-sm text-ink-600">
              ইমেইল (ঐচ্ছিক — উত্তর পেতে)
            </label>
            <Input
              id="askedByEmail"
              type="email"
              value={askedByEmail}
              onChange={(e) => setAskedByEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.askedByEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.askedByEmail}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded bg-emerald-950 px-6 py-2.5 font-body font-medium text-cream-50 transition-colors hover:bg-emerald-800"
        >
          প্রশ্ন জমা দিন
        </button>
      </form>
    </div>
  );
}
