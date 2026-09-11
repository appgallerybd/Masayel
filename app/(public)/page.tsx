import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GeometricDivider } from "@/components/ui/divider";
import { CategoryGrid } from "@/components/public/CategoryGrid";
import { MasalaCard } from "@/components/public/MasalaCard";
import { SearchIcon, ShareIcon, PrintIcon, BookmarkIcon } from "@/components/ui/icons";

// ⚠️ নমুনা ডেটা — পরের ধাপে Firestore থেকে আসল ডেটা ফেচ করে এখানে বসানো হবে
const FEATURED_CATEGORIES = [
  { slug: "namaz", name: "নামাজ" },
  { slug: "roja", name: "রোজা" },
  { slug: "zakat", name: "যাকাত" },
  { slug: "hajj", name: "হজ্জ" },
  { slug: "poribar", name: "পারিবারিক জীবন" },
  { slug: "lenden", name: "লেনদেন" },
];

const RECENT_MASALA = [
  {
    slug: "wudu-batil-howar-karon",
    title: "ওযু ভঙ্গের কারণসমূহ কী কী?",
    excerpt:
      "ওযু ভঙ্গের প্রধান কারণগুলোর মধ্যে রয়েছে পেশাব-পায়খানার রাস্তা দিয়ে কিছু বের হওয়া, গভীর ঘুম, রক্ত প্রবাহিত হওয়া...",
    categoryLabel: "নামাজ",
  },
  {
    slug: "roja-obosthay-vul-kore-khawa",
    title: "রোজা অবস্থায় ভুলে খেয়ে ফেললে করণীয় কী?",
    excerpt:
      "ভুলবশত পানাহার করলে রোজা ভঙ্গ হয় না — এই বিধানের বিস্তারিত ব্যাখ্যা ও দলিল...",
    categoryLabel: "রোজা",
  },
  {
    slug: "zakat-kar-upor-farz",
    title: "যাকাত কার উপর ফরজ?",
    excerpt: "নেসাব পরিমাণ সম্পদের মালিক হলে যাকাত ফরজ হয় — নেসাবের হিসাব...",
    categoryLabel: "যাকাত",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* হিরো — সরাসরি সার্চে নিয়ে যাওয়াই এখানে মূল কাজ */}
      <section className="border-b border-ink-900/10 bg-emerald-100/40">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h1 className="text-3xl leading-tight md:text-4xl">
            সঠিক মাসআলা, নির্ভরযোগ্য সূত্রে
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-600">
            কোরআন, হাদিস ও ফিকহের রেফারেন্সসহ যাচাইকৃত আলেমদের দেওয়া মাসআলার সংকলন
          </p>

          <form action="/search" className="relative mx-auto mt-6 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <Input
              name="q"
              placeholder="যেমন: ওযু, রোজা, যাকাত..."
              className="pl-9"
            />
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12">
        {/* আজকের মাসআলা — ফিচার্ড, সিগনেচার মোটিফসহ */}
        <section>
          <h2 className="text-xl">আজকের মাসআলা</h2>
          <Card accent className="mt-4">
            <Badge tone="verified">যাচাইকৃত</Badge>
            <h3 className="mt-3 font-heading text-xl text-emerald-950">
              নামাজে ইমামের পেছনে সূরা ফাতিহা পড়া প্রসঙ্গে
            </h3>
            <p className="mt-2 text-ink-600">
              জামাতে নামাজ পড়ার সময় ইমামের পেছনে মুক্তাদির সূরা ফাতিহা পড়া নিয়ে
              ফিকহবিদদের মতামত ও এর পেছনের দলিলসমূহ বিস্তারিতভাবে আলোচনা করা হয়েছে...
            </p>
            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/masala/imam-er-pichone-fatiha"
                className="inline-flex items-center justify-center rounded border border-emerald-950/20 px-5 py-2.5 font-body font-medium text-emerald-950 transition-colors hover:bg-emerald-100"
              >
                বিস্তারিত পড়ুন
              </Link>
              <div className="flex items-center gap-4 text-ink-400">
                <ShareIcon className="h-4 w-4" />
                <PrintIcon className="h-4 w-4" />
                <BookmarkIcon className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </section>

        <GeometricDivider className="max-w-xs" />

        {/* ক্যাটাগরি */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl">জনপ্রিয় ক্যাটাগরি</h2>
            <Link href="/categories" className="text-sm text-emerald-700 hover:underline">
              সব দেখুন
            </Link>
          </div>
          <div className="mt-4">
            <CategoryGrid categories={FEATURED_CATEGORIES} />
          </div>
        </section>

        {/* সাম্প্রতিক মাসআলা */}
        <section>
          <h2 className="text-xl">সাম্প্রতিক মাসআলা</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {RECENT_MASALA.map((masala) => (
              <MasalaCard key={masala.slug} {...masala} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
