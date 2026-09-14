import { ScholarCard } from "@/components/public/ScholarCard";
import { getScholars } from "@/lib/firebase/reads";

export const metadata = {
  title: "মুফতি/আলেমগণ",
};

export default async function ScholarsPage() {
  const scholars = await getScholars();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl">মুফতি ও আলেমগণ</h1>
      <p className="mt-1 text-ink-600">
        যাচাইকৃত আলেমগণ, যারা মাসআলার উত্তর দিয়ে থাকেন
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {scholars.map((scholar) => (
          <ScholarCard
            key={scholar.slug}
            slug={scholar.slug}
            name={scholar.name}
            designation={scholar.designation ?? ""}
          />
        ))}

        {scholars.length === 0 && (
          <p className="text-ink-600">এখনো কোনো আলেম যোগ করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}
