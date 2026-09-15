"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { MenuIcon } from "@/components/admin/icons";

export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* মোবাইল টপ বার — শুধু ছোট স্ক্রিনে, হ্যামবার্গার দিয়ে সাইডবার খোলে */}
        <header className="flex items-center gap-3 border-b border-ink-900/10 bg-emerald-950 px-4 py-3 text-cream-50 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="মেনু খোলো"
            className="p-1"
          >
            <MenuIcon className="h-[22px] w-[22px]" />
          </button>
          <p className="font-heading text-base">অ্যাডমিন প্যানেল</p>
        </header>

        <main className="flex-1 bg-ink-900 p-4 text-cream-50 md:p-6">{children}</main>
      </div>
    </div>
  );
}
