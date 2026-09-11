"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MasalaCard } from "@/components/public/MasalaCard";
import { BookmarkIcon } from "@/components/ui/icons";
import { MASALA_LIST } from "@/lib/mock-data";

const STORAGE_KEY = "masala:bookmarks";

export default function BookmarksPage() {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setBookmarkedSlugs(raw ? JSON.parse(raw) : []);
    } catch {
      setBookmarkedSlugs([]);
    }
  }, []);

  const bookmarkedMasala = MASALA_LIST.filter((m) =>
    bookmarkedSlugs?.includes(m.slug)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl">সংরক্ষিত মাসআলা</h1>

      {bookmarkedSlugs === null ? null : bookmarkedMasala.length === 0 ? (
        <div className="mt-12 flex flex-col items-center text-center">
          <BookmarkIcon className="h-10 w-10 text-ink-400" />
          <p className="mt-4 text-ink-600">এখনো কোনো মাসআলা সংরক্ষণ করা হয়নি।</p>
          <Link href="/categories" className="mt-2 text-sm text-emerald-700 hover:underline">
            ক্যাটাগরি ঘুরে দেখো
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {bookmarkedMasala.map((masala) => (
            <MasalaCard key={masala.slug} {...masala} />
          ))}
        </div>
      )}
    </div>
  );
}
