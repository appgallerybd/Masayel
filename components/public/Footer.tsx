import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";

const FOOTER_GROUPS = [
  {
    title: "অনুসন্ধান",
    links: [
      { href: "/categories", label: "বিষয়ভিত্তিক মাসআলা" },
      { href: "/search", label: "মাসআলা খুঁজুন" },
      { href: "/scholars", label: "আলেম ও মুফতি" },
    ],
  },
  {
    title: "আমাদের সম্পর্কে",
    links: [
      { href: "/about", label: "পরিচিতি ও নীতিমালা" },
      { href: "/contact", label: "যোগাযোগ" },
      { href: "/ask", label: "প্রশ্ন জমা দিন" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-[#f0eee5] pb-24 pt-12 md:pb-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-gold-400"><BookOpen className="h-5 w-5" /></span>
              <span className="font-heading text-xl font-bold text-emerald-950">মাসায়েল২৪</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink-600">
              কুরআন, সুন্নাহ ও নির্ভরযোগ্য ফিকহি সূত্রের আলোকে দ্বীনি জ্ঞান চর্চার একটি বাংলা প্ল্যাটফর্ম।
            </p>
            <p className="mt-3 max-w-sm text-xs leading-6 text-ink-400">
              প্রকাশিত তথ্য ব্যক্তিগত ফতোয়ার বিকল্প নয়। বিশেষ বা জটিল মাসআলায় যোগ্য আলেমের কাছে নিজের পরিস্থিতি বিস্তারিতভাবে তুলে ধরুন।
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-heading text-base font-semibold text-emerald-950">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center gap-1.5 text-sm text-ink-600 transition hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
                      {link.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-emerald-950/10 pt-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} মাসায়েল২৪। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>জ্ঞান, আমানত ও দায়িত্বশীলতা</p>
        </div>
      </div>
    </footer>
  );
}
