import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { GeometricDivider } from "@/components/ui/divider";
import { ReferenceBlock } from "@/components/public/ReferenceBlock";
import { BookmarkButton } from "@/components/public/BookmarkButton";
import { ShareButtons } from "@/components/public/ShareButtons";
import { MASALA_DETAILS, SCHOLARS } from "@/lib/mock-data";

interface MasalaPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: MasalaPageProps) {
  const masala = MASALA_DETAILS[params.slug];
  return { title: masala?.title ?? "মাসআলা পাওয়া যায়নি" };
}

export default function MasalaDetailPage({ params }: MasalaPageProps) {
  const masala = MASALA_DETAILS[params.slug];

  if (!masala) {
    notFound();
  }

  const scholar = SCHOLARS.find((s) => s.slug === masala.scholarSlug);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href={`/categories/${masala.categorySlug}`}
        className="text-sm text-emerald-700 hover:underline"
      >
        ← {masala.categoryLabel}
      </Link>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge>{masala.categoryLabel}</Badge>
        <Badge>{masala.fiqhSchool}</Badge>
      </div>

      <h1 className="mt-4 text-2xl leading-snug md:text-3xl">{masala.title}</h1>

      {scholar && (
        <p className="mt-3 text-sm text-ink-600">
          উত্তর দিয়েছেন —{" "}
          <Link href={`/scholars/${scholar.slug}`} className="text-emerald-700 hover:underline">
            {scholar.name}
          </Link>{" "}
          ({scholar.designation})
        </p>
      )}

      <div className="mt-6 flex items-center justify-between border-y border-ink-900/10 py-3">
        <ShareButtons title={masala.title} />
        <BookmarkButton slug={masala.slug} />
      </div>

      {/* মূল বিবরণ */}
      <div className="mt-8 space-y-4">
        {masala.content.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-ink-900">
            {paragraph}
          </p>
        ))}
      </div>

      {/* কোরআনের রেফারেন্স */}
      {masala.quranRefs.length > 0 && (
        <section className="mt-8 space-y-3">
          <h2 className="text-lg text-emerald-950">কুরআনের দলিল</h2>
          {masala.quranRefs.map((ref, i) => (
            <ReferenceBlock
              key={i}
              kind="quran"
              source={`${ref.surah}, আয়াত ${ref.ayah}`}
              text={ref.text}
            />
          ))}
        </section>
      )}

      {/* হাদিসের রেফারেন্স */}
      {masala.hadithRefs.length > 0 && (
        <section className="mt-8 space-y-3">
          <h2 className="text-lg text-emerald-950">হাদিসের দলিল</h2>
          {masala.hadithRefs.map((ref, i) => (
            <ReferenceBlock
              key={i}
              kind="hadith"
              source={`${ref.source}, হাদিস নং ${ref.number}`}
              text={ref.text}
            />
          ))}
        </section>
      )}

      <GeometricDivider className="mt-10 max-w-xs" />

      {/* ট্যাগ */}
      <div className="mt-6 flex flex-wrap gap-2">
        {masala.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  );
}
