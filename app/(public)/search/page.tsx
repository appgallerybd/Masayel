import { SearchIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { MasalaCard } from "@/components/public/MasalaCard";
import { MASALA_LIST } from "@/lib/mock-data";

export const metadata = {
  title: "সার্চ",
};

interface SearchPageProps {
  searchParams: { q?: string };
}

function searchMasala(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return MASALA_LIST.filter((masala) => {
    const haystack = `${masala.title} ${masala.excerpt} ${masala.categoryLabel}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? "";
  const results = searchMasala(query);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl">সার্চ করুন</h1>

      {/* GET ফর্ম — তাই ফলাফলের URL শেয়ারযোগ্য (?q=...) এবং ব্যাক বাটন কাজ করবে */}
      <form action="/search" className="relative mt-5">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <Input
          name="q"
          defaultValue={query}
          placeholder="যেমন: ওযু, রোজা, যাকাত..."
          className="pl-9"
          autoFocus
        />
      </form>

      <div className="mt-8">
        {!query && (
          <p className="text-ink-600">যা খুঁজছেন তা উপরে লিখে সার্চ করুন।</p>
        )}

        {query && results.length === 0 && (
          <p className="text-ink-600">
            &ldquo;{query}&rdquo; এর সাথে মিলে এমন কোনো মাসআলা পাওয়া যায়নি।
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-ink-600">
              &ldquo;{query}&rdquo; এর জন্য {results.length}টি ফলাফল পাওয়া গেছে
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {results.map((masala) => (
                <MasalaCard key={masala.slug} {...masala} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
