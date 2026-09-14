import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ReferenceBlock } from "@/components/public/ReferenceBlock";
import { BookmarkButton } from "@/components/public/BookmarkButton";
import { ShareButtons } from "@/components/public/ShareButtons";
import { getCategoryBySlug, getMasalaBySlug, getScholarBySlug } from "@/lib/firebase/reads";

interface MasalaPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MasalaPageProps) {
  const masala = await getMasalaBySlug(params.slug);
  return { title: masala?.title ?? "মাসআলা পাওয়া যায়নি" };
}

export default async function MasalaDetailPage({ params }: MasalaPageProps) {
  const masala = await getMasalaBySlug(params.slug);
  if (!masala) notFound();

  const [category, scholar] = await Promise.all([
    getCategoryBySlug(masala.categoryId),
    masala.scholarId ? getScholarBySlug(masala.scholarId) : Promise.resolve(null),
  ]);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href={`/categories/${masala.categoryId}`}
        className="text-sm text-emerald-700 hover:underline"
      >
        ← {category?.name ?? "ক্যাটাগরি"}
      </Link>

      <div className="mt-3 flex flex-wrap gap-2">
        {category && <Badge>{category.name}</Badge>}
        {masala.fiqhSchool && <Badge>{masala.fiqhSchool}</Badge>}
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

      <div className="mt-8 space-y-4">
        {masala.content.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-ink-900">
            {paragraph}
          </p>
        ))}
      </div>

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

      <div className="mt-10 border-t border-ink-900/10 pt-6">
        <div className="flex flex-wrap gap-2">
          {masala.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
