import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArchRow, ArchIcon } from "@/components/ui/arch";
import { SearchIcon, ChevronRightIcon } from "@/components/ui/icons";
import { getCategories, getPublishedMasala } from "@/lib/firebase/reads";

export default async function HomePage() {
  const [categories, masalaList] = await Promise.all([
    getCategories(),
    getPublishedMasala(7), // ১টা ফিচার্ড + ৬টা সাম্প্রতিক
  ]);

  const [featured, ...recent] = masalaList;

  return (
    <div>
      {/* হিরো — গাঢ় এমারেল্ড, নিচে খিলানের সারি দিয়ে পরের সেকশনে রূপান্তর */}
      <section className="bg-emerald-950 pb-0 pt-14 text-cream-50">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="font-heading text-sm tracking-wide text-gold-400">
            মাসআলা শেয়ারিং
          </p>
          <h1 className="mt-3 font-heading text-[2.5rem] leading-[1.15] tracking-tight md:text-5xl">
            সঠিক মাসআলা,
            <br />
            নির্ভরযোগ্য সূত্রে
          </h1>
          <p className="mx-auto mt-4 max-w-md text-cream-100/70">
            কোরআন, হাদিস ও ফিকহের রেফারেন্সসহ যাচাইকৃত আলেমদের দেওয়া মাসআলার সংকলন
          </p>

          <form action="/search" className="relative mx-auto mt-7 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <Input
              name="q"
              placeholder="যেমন: ওযু, রোজা, যাকাত..."
              className="border-none pl-9 shadow-sm"
            />
          </form>

          <div className="h-8" />
        </div>

        <ArchRow />
      </section>

      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-12 pt-8">
        {/* ক্যাটাগরি — হরাইজন্টাল স্ক্রল চিপ */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg text-ink-900">ক্যাটাগরি</h2>
            <Link href="/categories" className="text-sm text-emerald-700 hover:underline">
              সব দেখুন
            </Link>
          </div>
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-emerald-700/25 bg-emerald-100/60 px-4 py-2 text-sm text-emerald-900"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        {/* আজকের মাসআলা — খিলান আইকনসহ ফিচার্ড */}
        {featured && (
          <section>
            <ArchIcon className="text-emerald-700" />
            <div className="mt-2 flex items-center gap-2">
              <Badge tone="verified">যাচাইকৃত</Badge>
              <span className="text-xs text-ink-400">আজকের মাসআলা</span>
            </div>
            <Link href={`/masala/${featured.slug}`} className="mt-2 block">
              <h3 className="font-heading text-xl leading-snug text-emerald-950">
                {featured.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-ink-600">{featured.content[0]}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-700">
                বিস্তারিত পড়ুন
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </section>
        )}

        {/* সাম্প্রতিক মাসআলা — এডিটোরিয়াল লিস্ট, কার্ড-গ্রিড না */}
        {recent.length > 0 && (
          <section>
            <h2 className="text-lg text-ink-900">সাম্প্রতিক মাসআলা</h2>
            <div className="mt-3 divide-y divide-ink-900/10 border-t border-ink-900/10">
              {recent.map((masala) => {
                const category = categories.find((c) => c.slug === masala.categoryId);
                return (
                  <Link
                    key={masala.slug}
                    href={`/masala/${masala.slug}`}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      {category && (
                        <span className="text-xs text-emerald-700">{category.name}</span>
                      )}
                      <h3 className="mt-0.5 font-heading text-base leading-snug text-emerald-950">
                        {masala.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-ink-600">
                        {masala.content[0]}
                      </p>
                    </div>
                    <ChevronRightIcon className="mt-1 h-4 w-4 shrink-0 text-ink-400" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
