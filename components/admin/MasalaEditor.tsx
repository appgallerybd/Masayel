"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CATEGORIES, SCHOLARS, QuranRef, HadithRef, MockMasalaDetail } from "@/lib/mock-data";
import { upsertMasala, deleteMasala } from "@/lib/admin-store";

const FIQH_SCHOOLS = ["হানাফি", "শাফেয়ি", "মালেকি", "হাম্বলি"];

interface MasalaEditorProps {
  mode: "create" | "edit";
  initial?: MockMasalaDetail;
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

  const [title, setTitle] = useState(initial?.title ?? "");
  const [categorySlug, setCategorySlug] = useState(initial?.categorySlug ?? CATEGORIES[0].slug);
  const [fiqhSchool, setFiqhSchool] = useState(initial?.fiqhSchool ?? FIQH_SCHOOLS[0]);
  const [scholarSlug, setScholarSlug] = useState(initial?.scholarSlug ?? SCHOLARS[0].slug);
  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [tagsText, setTagsText] = useState(initial?.tags.join(", ") ?? "");
  const [contentText, setContentText] = useState(initial?.content.join("\n\n") ?? "");
  const [quranRefs, setQuranRefs] = useState<QuranRef[]>(initial?.quranRefs ?? []);
  const [hadithRefs, setHadithRefs] = useState<HadithRef[]>(initial?.hadithRefs ?? []);
  const [saving, setSaving] = useState(false);

  function addQuranRef() {
    setQuranRefs((refs) => [...refs, { surah: "", ayah: "", text: "" }]);
  }
  function updateQuranRef(index: number, patch: Partial<QuranRef>) {
    setQuranRefs((refs) => refs.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function removeQuranRef(index: number) {
    setQuranRefs((refs) => refs.filter((_, i) => i !== index));
  }

  function addHadithRef() {
    setHadithRefs((refs) => [...refs, { source: "", number: "", text: "" }]);
  }
  function updateHadithRef(index: number, patch: Partial<HadithRef>) {
    setHadithRefs((refs) => refs.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function removeHadithRef(index: number) {
    setHadithRefs((refs) => refs.filter((_, i) => i !== index));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const category = CATEGORIES.find((c) => c.slug === categorySlug)!;
    const slug = initial?.slug ?? slugify(title);

    const record: MockMasalaDetail = {
      slug,
      title,
      categorySlug,
      categoryLabel: category.name,
      fiqhSchool,
      scholarSlug,
      status,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      content: contentText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      quranRefs: quranRefs.filter((r) => r.text.trim() !== ""),
      hadithRefs: hadithRefs.filter((r) => r.text.trim() !== ""),
    };

    // TODO: Firestore যুক্ত হলে এখানে addDoc/updateDoc(collection(db, "masala"), record) বসবে
    upsertMasala(record);

    setSaving(false);
    router.push("/admin/masala");
  }

  function handleDelete() {
    if (!initial) return;
    if (!window.confirm("এই মাসআলাটি মুছে ফেলতে চাও?")) return;
    // TODO: Firestore যুক্ত হলে deleteDoc(doc(db, "masala", initial.slug)) বসবে
    deleteMasala(initial.slug);
    router.push("/admin/masala");
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
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
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="bg-cream-50 text-ink-900"
          >
            {CATEGORIES.map((c) => (
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
            value={scholarSlug}
            onChange={(e) => setScholarSlug(e.target.value)}
            className="bg-cream-50 text-ink-900"
          >
            {SCHOLARS.map((s) => (
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

      {/* কুরআনের দলিল */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-cream-100/70">কুরআনের দলিল</label>
          <button
            type="button"
            onClick={addQuranRef}
            className="text-sm text-gold-400 hover:underline"
          >
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

      {/* হাদিসের দলিল */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-cream-100/70">হাদিসের দলিল</label>
          <button
            type="button"
            onClick={addHadithRef}
            className="text-sm text-gold-400 hover:underline"
          >
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
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-400 hover:underline"
          >
            মুছে ফেলুন
          </button>
        )}
      </div>
    </form>
  );
}
