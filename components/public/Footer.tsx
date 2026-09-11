import Link from "next/link";
import { GeometricDivider } from "@/components/ui/divider";

const FOOTER_LINKS = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
  { href: "/scholars", label: "মুফতি/আলেমগণ" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-900/10 pb-20 pt-10 md:pb-10">
      <div className="mx-auto max-w-5xl px-4">
        <GeometricDivider className="mb-8 max-w-xs" />

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-heading text-lg text-emerald-950">মাসআলা শেয়ারিং</p>
            <p className="mt-1 max-w-xs text-sm text-ink-600">
              কোরআন, হাদিস ও ফিকহের রেফারেন্সসহ নির্ভরযোগ্য মাসআলা সংকলন
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm md:flex-row md:gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink-600 hover:text-emerald-950">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-xs text-ink-400">
          © {new Date().getFullYear()} মাসআলা শেয়ারিং। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
