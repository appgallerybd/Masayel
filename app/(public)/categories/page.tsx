import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { getCategories } from "@/lib/firebase/reads";

export const metadata = {
  title: "সব ক্যাটাগরি",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl">সব ক্যাটাগরি</h1>
      <p className="mt-1 text-ink-600">বিষয়ভিত্তিকভাবে মাসআলা খুঁজে নিন</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="flex items-center justify-between border border-ink-900/10 bg-white/60 px-5 py-4 transition-colors hover:border-emerald-700/30"
          >
            <div>
              <p className="font-heading text-lg text-emerald-950">{category.name}</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-400" />
          </Link>
        ))}

        {categories.length === 0 && (
          <p className="text-ink-600">এখনো কোনো ক্যাটাগরি যোগ করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}
