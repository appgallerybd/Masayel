import Link from "next/link";
import { BookOpen, Search, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/categories", label: "বিষয়সমূহ" },
  { href: "/scholars", label: "আলেম ও মুফতি" },
  { href: "/ask", label: "প্রশ্ন করুন" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-950/10 bg-cream-50/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" aria-label="মাসায়েল২৪ হোমপেজ">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950 text-gold-400 shadow-sm transition group-hover:bg-emerald-800">
            <BookOpen className="h-5 w-5" strokeWidth={1.7} />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-lg font-bold leading-tight text-emerald-950 sm:text-xl">মাসায়েল২৪</span>
            <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.16em] text-ink-400 sm:text-[11px]">MASAEL24 · দ্বীনি জ্ঞানভান্ডার</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="প্রধান মেনু">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink-600 transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/search" aria-label="মাসআলা খুঁজুন" className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-950/10 bg-white text-emerald-900 transition hover:border-emerald-700/40 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
            <Search className="h-4.5 w-4.5" />
          </Link>
          <Link href="/ask" className="hidden items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:inline-flex">
            প্রশ্ন করুন <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
