"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MasalaCard } from "@/components/public/MasalaCard";
import { SearchIcon } from "@/components/ui/icons";
import { Masala } from "@/types/masala";
import { Category } from "@/types/category";

function SearchPageInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<Masala[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((data) => setResults(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300); // হালকা ডিবাউন্স

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  function categoryLabel(categoryId: string) {
    return categories.find((c) => c.slug === categoryId)?.name ?? "";
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl">মাসআলা খুঁজুন</h1>

      <div className="relative mt-5">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="যেমন: ওযু, রোজা, যাকাত..."
          className="pl-9"
        />
      </div>

      <div className="mt-8">
        {query.trim() === "" && (
          <p className="text-ink-600">যা খুঁজছেন তা লিখুন — যেমন কোনো বিষয় বা ক্যাটাগরির নাম।</p>
        )}

        {query.trim() !== "" && !loading && results.length === 0 && (
          <p className="text-ink-600">
            &ldquo;{query}&rdquo; এর সাথে মিলে এমন কোনো মাসআলা পাওয়া যায়নি।
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-ink-400">{results.length}টি ফলাফল পাওয়া গেছে</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {results.map((masala) => (
                <MasalaCard
                  key={masala.slug}
                  slug={masala.slug}
                  title={masala.title}
                  excerpt={masala.content[0] ?? ""}
                  categoryLabel={categoryLabel(masala.categoryId)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
