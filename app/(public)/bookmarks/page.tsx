"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MasalaCard } from "@/components/public/MasalaCard";
import { BookmarkIcon } from "@/components/ui/icons";
import { Masala } from "@/types/masala";
import { Category } from "@/types/category";

const STORAGE_KEY = "masala:bookmarks";

export default function BookmarksPage() {
  const [masalaList, setMasalaList] = useState<Masala[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories([]));

    let slugs: string[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      slugs = raw ? JSON.parse(raw) : [];
    } catch {
      slugs = [];
    }

    if (slugs.length === 0) {
      setMasalaList([]);
      return;
    }

    fetch(`/api/masala?slugs=${encodeURIComponent(slugs.join(","))}`)
      .then((r) => r.json())
      .then(setMasalaList)
      .catch(() => setMasalaList([]));
  }, []);

  function categoryLabel(categoryId: string) {
    return categories.find((c) => c.slug === categoryId)?.name ?? "";
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl">সংরক্ষিত মাসআলা</h1>

      {masalaList === null ? null : masalaList.length === 0 ? (
        <div className="mt-12 flex flex-col items-center text-center">
          <BookmarkIcon className="h-10 w-10 text-ink-400" />
          <p className="mt-4 text-ink-600">এখনো কোনো মাসআলা সংরক্ষণ করা হয়নি।</p>
          <Link href="/categories" className="mt-2 text-sm text-emerald-700 hover:underline">
            ক্যাটাগরি ঘুরে দেখো
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {masalaList.map((masala) => (
            <MasalaCard
              key={masala.slug}
              slug={masala.slug}
              title={masala.title}
              excerpt={masala.content[0] ?? ""}
              categoryLabel={categoryLabel(masala.categoryId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
