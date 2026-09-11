import Link from "next/link";
import { SearchIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { href: "/categories", label: "ক্যাটাগরি" },
  { href: "/scholars", label: "মুফতি/আলেমগণ" },
  { href: "/ask", label: "প্রশ্ন করুন" },
];

export function Header() {
  return (
    <header className="border-b border-ink-900/10 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-heading text-xl text-emerald-950">
          মাসআলা শেয়ারিং
        </Link>

        {/* ডেস্কটপ নেভিগেশন — মোবাইলে লুকানো, নিচে BottomNav ব্যবহার হবে */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-ink-600 transition-colors hover:text-emerald-950"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="সার্চ করুন"
            className="text-ink-600 hover:text-emerald-950"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
        </nav>

        {/* মোবাইলে শুধু সার্চ আইকন — বাকি নেভিগেশন নিচের বটম-ন্যাভে */}
        <Link
          href="/search"
          aria-label="সার্চ করুন"
          className="text-ink-600 md:hidden"
        >
          <SearchIcon className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
