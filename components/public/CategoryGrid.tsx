import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

export interface CategoryItem {
  slug: string;
  name: string;
  count?: number;
}

export function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="flex items-center justify-between border border-ink-900/10 bg-white/60 px-4 py-3 transition-colors hover:border-emerald-700/30"
        >
          <span className="font-body text-ink-900">{category.name}</span>
          <ChevronRightIcon className="h-4 w-4 text-ink-400" />
        </Link>
      ))}
    </div>
  );
}
