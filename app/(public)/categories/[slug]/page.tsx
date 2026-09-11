import Link from "next/link";
import { notFound } from "next/navigation";
import { MasalaCard } from "@/components/public/MasalaCard";
import { CATEGORIES, MASALA_LIST } from "@/lib/mock-data";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  return { title: category?.name ?? "ক্যাটাগরি পাওয়া যায়নি" };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const masalaInCategory = MASALA_LIST.filter((m) => m.categorySlug === params.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/categories" className="text-sm text-emerald-700 hover:underline">
        ← সব ক্যাটাগরি
      </Link>

      <h1 className="mt-3 text-2xl">{category.name}</h1>
      <p className="mt-1 text-ink-600">{category.description}</p>

      {masalaInCategory.length === 0 ? (
        <p className="mt-10 text-ink-600">
          এই ক্যাটাগরিতে এখনো কোনো মাসআলা যোগ করা হয়নি।
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {masalaInCategory.map((masala) => (
            <MasalaCard
              key={masala.slug}
              slug={masala.slug}
              title={masala.title}
              excerpt={masala.excerpt}
              categoryLabel={masala.categoryLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
