"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

// অ্যাডমিন প্যানেলের রুট লেআউট — পাবলিক সাইট থেকে সম্পূর্ণ আলাদা কোড/UI।
// /admin/login পেজে সাইডবার দেখানো হয় না (লগইনের আগে নেভিগেশনের দরকার নেই)।
// middleware.ts /admin রুট প্রোটেক্ট করে — লগইন করা না থাকলে /admin/login-এ পাঠায়।
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-ink-900 text-cream-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-ink-900 text-cream-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
