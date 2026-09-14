import Link from "next/link";
import { notFound } from "next/navigation";
import { MasalaCard } from "@/components/public/MasalaCard";
import { getScholarBySlug, getMasalaByScholar } from "@/lib/firebase/reads";

interface ScholarPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ScholarPageProps) {
  const scholar = await getScholarBySlug(params.slug);
  return { title: scholar?.name ?? "আলেম পাওয়া যায়নি" };
}

export default async function ScholarDetailPage({ params }: ScholarPageProps) {
  const scholar = await getScholarBySlug(params.slug);
  if (!scholar) notFound();

  const answeredMasala = await getMasalaByScholar(params.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/scholars" className="text-sm text-emerald-700 hover:underline">
        ← সব আলেম
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-heading text-2xl text-emerald-950">
          {scholar.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl">{scholar.name}</h1>
          <p className="text-ink-600">{scholar.designation}</p>
        </div>
      </div>

      {scholar.bio && <p className="mt-6 leading-relaxed text-ink-900">{scholar.bio}</p>}

      {scholar.credentials && (
        <p className="mt-3 text-sm text-ink-600">{scholar.credentials}</p>
      )}

      {answeredMasala.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl">এই আলেমের উত্তর দেওয়া মাসআলা</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {answeredMasala.map((masala) => (
              <MasalaCard
                key={masala.slug}
                slug={masala.slug}
                title={masala.title}
                excerpt={masala.content[0] ?? ""}
                categoryLabel=""
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
