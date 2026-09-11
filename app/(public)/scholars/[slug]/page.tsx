import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MasalaCard } from "@/components/public/MasalaCard";
import { SCHOLARS, MASALA_DETAILS } from "@/lib/mock-data";

interface ScholarPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: ScholarPageProps) {
  const scholar = SCHOLARS.find((s) => s.slug === params.slug);
  return { title: scholar?.name ?? "প্রোফাইল পাওয়া যায়নি" };
}

export default function ScholarDetailPage({ params }: ScholarPageProps) {
  const scholar = SCHOLARS.find((s) => s.slug === params.slug);

  if (!scholar) {
    notFound();
  }

  const answeredMasala = Object.values(MASALA_DETAILS).filter(
    (m) => m.scholarSlug === scholar.slug
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/scholars" className="text-sm text-emerald-700 hover:underline">
        ← মুফতি/আলেমগণ
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-heading text-2xl text-emerald-950">
          {scholar.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl">{scholar.name}</h1>
          <Badge tone="verified" className="mt-1">
            {scholar.designation}
          </Badge>
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-ink-900">{scholar.bio}</p>

      <div className="mt-6">
        <h2 className="text-lg text-emerald-950">শিক্ষাগত যোগ্যতা</h2>
        <ul className="mt-2 space-y-1 text-ink-600">
          {scholar.credentials.map((credential) => (
            <li key={credential}>• {credential}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-lg text-emerald-950">উত্তর দেওয়া মাসআলা</h2>
        {answeredMasala.length === 0 ? (
          <p className="mt-2 text-ink-600">এখনো কোনো মাসআলা যুক্ত হয়নি।</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {answeredMasala.map((m) => (
              <MasalaCard
                key={m.slug}
                slug={m.slug}
                title={m.title}
                excerpt={m.content[0]}
                categoryLabel={m.categoryLabel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
