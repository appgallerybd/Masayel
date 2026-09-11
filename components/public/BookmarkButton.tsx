"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookmarkIcon } from "@/components/ui/icons";

const STORAGE_KEY = "masala:bookmarks";

function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BookmarkButton({ slug }: { slug: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(readBookmarks().includes(slug));
  }, [slug]);

  function toggle() {
    const current = readBookmarks();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsBookmarked(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "সংরক্ষণ থেকে সরান" : "সংরক্ষণ করুন"}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm transition-colors",
        isBookmarked ? "text-gold-600" : "text-ink-400 hover:text-ink-900"
      )}
    >
      <BookmarkIcon className={cn("h-4 w-4", isBookmarked && "fill-gold-600")} />
      {isBookmarked ? "সংরক্ষিত" : "সংরক্ষণ করুন"}
    </button>
  );
}
