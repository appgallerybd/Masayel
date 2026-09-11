import { ScholarCard } from "@/components/public/ScholarCard";
import { SCHOLARS } from "@/lib/mock-data";

export const metadata = {
  title: "মুফতি/আলেমগণ",
};

export default function ScholarsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl">মুফতি ও আলেমগণ</h1>
      <p className="mt-1 text-ink-600">
        যাচাইকৃত আলেমগণ, যারা মাসআলার উত্তর দিয়ে থাকেন
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SCHOLARS.map((scholar) => (
          <ScholarCard
            key={scholar.slug}
            slug={scholar.slug}
            name={scholar.name}
            designation={scholar.designation}
          />
        ))}
      </div>
    </div>
  );
}
