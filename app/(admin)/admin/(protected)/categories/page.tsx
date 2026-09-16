"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
  }

  useEffect(load, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError(null);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "যোগ করা যায়নি");
      return;
    }

    setNewName("");
    load();
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("এই ক্যাটাগরি মুছে ফেলতে চাও? এই ক্যাটাগরির মাসআলাগুলো অনাথ (orphan) হয়ে যাবে।")) return;
    await fetch(`/api/admin/categories/${slug}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">ক্যাটাগরি</h1>
      <p className="mt-1 text-sm text-cream-100/60">মাসআলার বিষয়ভিত্তিক ক্যাটাগরি ব্যবস্থাপনা করো</p>

      <div className="mt-6 space-y-2">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="flex items-center justify-between border border-cream-50/10 bg-emerald-950/40 px-4 py-3"
          >
            <div>
              <p className="text-cream-50">{category.name}</p>
              <p className="text-xs text-cream-100/40">/{category.slug}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(category.slug)}
              className="text-sm text-red-400 hover:underline"
            >
              মুছে ফেলুন
            </button>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-cream-100/50">এখনো কোনো ক্যাটাগরি যোগ করা হয়নি।</p>
        )}
      </div>

      <form onSubmit={handleAdd} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="নতুন ক্যাটাগরির নাম (যেমন: হজ্জ)"
          className="bg-cream-50 text-ink-900"
        />
        <button
          type="submit"
          className="shrink-0 rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100"
        >
          যোগ করুন
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
