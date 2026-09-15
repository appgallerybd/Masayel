"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { cn } from "@/lib/utils";
import { useAdminUser } from "@/lib/admin-user-context";
import {
  DashboardIcon,
  MasalaIcon,
  CategoryIcon,
  ScholarIcon,
  QuestionIcon,
  UsersIcon,
  SettingsIcon,
  LogoutIcon,
  CloseIcon,
} from "@/components/admin/icons";

const NAV_ITEMS = [
  { href: "/admin", label: "ড্যাশবোর্ড", exact: true, icon: DashboardIcon },
  { href: "/admin/masala", label: "মাসআলা", icon: MasalaIcon },
  { href: "/admin/categories", label: "ক্যাটাগরি", icon: CategoryIcon },
  { href: "/admin/scholars", label: "মুফতি/আলেমগণ", icon: ScholarIcon },
  { href: "/admin/questions", label: "প্রশ্নসমূহ", icon: QuestionIcon },
  { href: "/admin/users", label: "ইউজার/রোল", icon: UsersIcon },
  { href: "/admin/settings", label: "সেটিংস", icon: SettingsIcon },
];

const ROLE_LABELS: Record<string, string> = {
  superadmin: "সুপার অ্যাডমিন",
  admin: "অ্যাডমিন",
  moderator: "মডারেটর",
  scholar: "আলেম",
  user: "সাধারণ ইউজার",
};

interface SidebarProps {
  /** মোবাইলে ড্রয়ার খোলা আছে কিনা — ডেস্কটপে এটা প্রযোজ্য না */
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAdminUser();

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* মোবাইল ড্রয়ারের ব্যাকড্রপ — বাইরে ট্যাপ করলে বন্ধ হয় */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-emerald-950",
          "transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:z-auto md:w-60 md:translate-x-0 md:border-r md:border-cream-50/10"
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div>
            <p className="font-heading text-lg text-cream-50">মাসআলা শেয়ারিং</p>
            <p className="text-xs text-cream-100/50">অ্যাডমিন প্যানেল</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করো"
            className="text-cream-100/60 md:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm font-body transition-colors",
                  isActive
                    ? "border-gold-400 bg-cream-50/10 text-cream-50"
                    : "border-transparent text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-cream-50/10 p-3">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-50/10 font-heading text-sm text-cream-50">
              {user.name?.charAt(0) || user.email.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-cream-50">{user.name || user.email}</p>
              <p className="text-xs text-cream-100/50">{ROLE_LABELS[user.role] ?? user.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
          >
            <LogoutIcon className="h-[18px] w-[18px]" />
            লগআউট
          </button>
        </div>
      </aside>
    </>
  );
}
