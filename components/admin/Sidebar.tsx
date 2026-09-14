"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "ড্যাশবোর্ড", exact: true },
  { href: "/admin/masala", label: "মাসআলা" },
  { href: "/admin/categories", label: "ক্যাটাগরি" },
  { href: "/admin/scholars", label: "মুফতি/আলেমগণ" },
  { href: "/admin/questions", label: "প্রশ্নসমূহ" },
  { href: "/admin/users", label: "ইউজার/রোল" },
  { href: "/admin/settings", label: "সেটিংস" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-cream-50/10 bg-emerald-950">
      <div className="px-5 py-6">
        <p className="font-heading text-lg text-cream-50">মাসআলা শেয়ারিং</p>
        <p className="text-xs text-cream-100/50">অ্যাডমিন প্যানেল</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded px-3 py-2 text-sm font-body transition-colors",
                isActive
                  ? "bg-cream-50/10 text-cream-50"
                  : "text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cream-50/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded px-3 py-2 text-left text-sm text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
        >
          লগআউট
        </button>
      </div>
    </aside>
  );
}
