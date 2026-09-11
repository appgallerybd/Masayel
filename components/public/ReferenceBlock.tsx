import { cn } from "@/lib/utils";

interface ReferenceBlockProps {
  kind: "quran" | "hadith";
  source: string; // কোরআনের ক্ষেত্রে সূরার নাম + আয়াত, হাদিসের ক্ষেত্রে গ্রন্থ + নম্বর
  text: string;
}

// কোরআন রেফারেন্স এমারেল্ড বর্ডারে, হাদিস রেফারেন্স গোল্ড বর্ডারে — দুটো আলাদা
// ধরনের সূত্র চোখেই আলাদা বোঝা যায়।
export function ReferenceBlock({ kind, source, text }: ReferenceBlockProps) {
  return (
    <div
      className={cn(
        "border-l-2 bg-cream-100/60 py-3 pl-4",
        kind === "quran" ? "border-emerald-700" : "border-gold-600"
      )}
    >
      <p className="font-heading text-base leading-relaxed text-ink-900">{text}</p>
      <p
        className={cn(
          "mt-1.5 text-sm font-body",
          kind === "quran" ? "text-emerald-700" : "text-gold-600"
        )}
      >
        {kind === "quran" ? "কুরআন" : "হাদিস"} — {source}
      </p>
    </div>
  );
}
