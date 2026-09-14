"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Category } from "@/types/category";
import { Scholar } from "@/types/scholar";
import { QuranReference, HadithReference, Masala } from "@/types/masala";

const FIQH_SCHOOLS = ["হানাফি", "শাফেয়ি", "মালেকি", "হাম্বলি"];

interface MasalaEditorProps {
  mode: "create" | "edit";
  initial?: Masala;
}

function slugify(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}

export function MasalaEditor({ mode, initial }: MasalaEditorProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [scholars, setScholars] = useState<Scholar[]>([]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");
  const [fiqhSchool, setFiqhSchool] = useState(initial?.fiqhSchool ?? FIQH_SCHOOLS[0]);
  const [scholarId, setScholarId] = useState(initial?.scholarId ?? "");
  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [tagsText, setTagsText] = useState(initial?.tags.join(", ") ?? "");
  const [contentText, setContentText] = useState(initial?.content.join("\n\n") ?? "");
  const [quranRefs, setQuranRefs] = useState<QuranReference[]>(initial?.quranRefs ?? []);
  const [hadithRefs, setHadithRefs] = useState<HadithReference[]>(initial?.hadithRefs ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((data) => {
      setCategories(data);
      setCategoryId((current) => current || data[0]?.slug || "");
    });
    fetch("/api/scholars").then((r) => r.json()).then((data) => {
      setScholars(data);
      setScholarId((current) => current || data[0]?.slug || "");
    });
  }, []);

  function addQuranRef() {
    setQuranRefs((refs) => [...refs, { surah: "", ayah: "", text: "" }]);
  }
  function updateQuranRef(index: number, patch: Partial<QuranReference>) {
    setQuranRefs((refs) => refs.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function removeQuranRef(index: number) {
    setQuranRefs((refs) => refs.filter((_, i) => i !== index));
  }

  function addHadithRef() {
    setHadithRefs((refs) => [...refs, { source: "", number: "", text: "" }]);
  }
  function updateHadithRef(index: number, patch: Partial<HadithReference>) {
    setHadithRefs((refs) => refs.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function removeHadithRef(index: number) {
    setHadithRefs((refs) => refs.filter((_, i) => i !== index));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const slug = initial?.slug ?? slugify(title);
    const payload = {
      slug,
      title,
      categoryId,
      fiqhSchool,
      scholarId,
      status,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      content: contentText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      quranRefs: quranRefs.filter((r) => r.text.trim() !== ""),
      hadithRefs: hadithRefs.filter((r) => r.text.trim() !== ""),
    };

    const res = await fetch(
      mode === "create" ? "/api/admin/masala" : `/api/admin/masala/${slug}`,
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "সংরক্ষণ ব্যর্থ হয়েছে");
      return;
    }

    router.push("/admin/masala");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial) return;
    if (!window.confirm("এই মাসআলাটি মুছে ফেলতে চাও?")) return;

    const res = await fetch(`/api/admin/masala/${initial.slug}`, { method: "DELETE" });
    if (!res.ok) {
      setError("মুছে ফেলা যায়নি");
      return;
    }
    router.push("/admin/masala");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {error && (
        <p className="border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1.5 block text-sm text-cream-100/70">শিরোনাম</label>
        <Input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="মাসআলার শিরোনাম লিখো"
          className="bg-cream-50 text-ink-900"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm text-cream-100/70">ক্যাটাগরি</label>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="bg-cream-50 text-ink-900"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-cream-100/70">ফিকহ মাযহাব</label>
          <Select
            value={fiqhSchool}
            onChange={(e) => setFiqhSchool(e.target.value)}
            className="bg-cream-50 text-ink-900"
          >
            {FIQH_SCHOOLS.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-cream-100/70">উত্তরদাতা আলেম</label>
          <Select
            value={scholarId}
            onChange={(e) => setScholarId(e.target.value)}
            className="bg-cream-50 text-ink-900"
          >
            {scholars.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-cream-100/70">
          বিবরণ (প্রতিটি অনুচ্ছেদের মাঝে একটা ফাঁকা লাইন দাও)
        </label>
        <Textarea
          required
          rows={8}
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          className="bg-cream-50 text-ink-900"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-cream-100/70">কুরআনের দলিল</label>
          <button type="button" onClick={addQuranRef} className="text-sm text-gold-400 hover:underline">
            + যোগ করুন
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {quranRefs.map((ref, i) => (
            <div key={i} className="grid gap-2 border border-cream-50/10 p-3 sm:grid-cols-[1fr_1fr]">
              <Input
                placeholder="সূরার নাম"
                value={ref.surah}
                onChange={(e) => updateQuranRef(i, { surah: e.target.value })}
                className="bg-cream-50 text-ink-900"
              />
              <Input
                placeholder="আয়াত নং"
                value={ref.ayah}
                onChange={(e) => updateQuranRef(i, { ayah: e.target.value })}
                className="bg-cream-50 text-ink-900"
              />
              <Textarea
                placeholder="আয়াতের অর্থ"
                value={ref.text}
                onChange={(e) => updateQuranRef(i, { text: e.target.value })}
                className="bg-cream-50 text-ink-900 sm:col-span-2"
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeQuranRef(i)}
                className="text-left text-sm text-red-400 hover:underline sm:col-span-2"
              >
                সরিয়ে দিন
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-cream-100/70">হাদিসের দলিল</label>
          <button type="button" onClick={addHadithRef} className="text-sm text-gold-400 hover:underline">
            + যোগ করুন
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {hadithRefs.map((ref, i) => (
            <div key={i} className="grid gap-2 border border-cream-50/10 p-3 sm:grid-cols-[1fr_1fr]">
              <Input
                placeholder="গ্রন্থের নাম"
                value={ref.source}
                onChange={(e) => updateHadithRef(i, { source: e.target.value })}
                className="bg-cream-50 text-ink-900"
              />
              <Input
                placeholder="হাদিস নং"
                value={ref.number}
                onChange={(e) => updateHadithRef(i, { number: e.target.value })}
                className="bg-cream-50 text-ink-900"
              />
              <Textarea
                placeholder="হাদিসের বক্তব্য"
                value={ref.text}
                onChange={(e) => updateHadithRef(i, { text: e.target.value })}
                className="bg-cream-50 text-ink-900 sm:col-span-2"
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeHadithRef(i)}
                className="text-left text-sm text-red-400 hover:underline sm:col-span-2"
              >
                সরিয়ে দিন
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-cream-100/70">ট্যাগ (কমা দিয়ে আলাদা করো)</label>
        <Input
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="নামাজ, ওযু, জামাত"
          className="bg-cream-50 text-ink-900"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-cream-100/70">স্ট্যাটাস</label>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          className="bg-cream-50 text-ink-900"
        >
          <option value="draft">খসড়া (Draft)</option>
          <option value="published">প্রকাশিত (Published)</option>
        </Select>
      </div>

      <div className="flex items-center justify-between border-t border-cream-50/10 pt-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-cream-50 px-6 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100 disabled:opacity-50"
        >
          {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={handleDelete} className="text-sm text-red-400 hover:underline">
            মুছে ফেলুন
          </button>
        )}
      </div>
    </form>
  );
}
