"use client";

import { useAdminUser } from "@/lib/admin-user-context";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "সুপার অ্যাডমিন",
  admin: "অ্যাডমিন",
  moderator: "মডারেটর",
  scholar: "আলেম",
  user: "সাধারণ ইউজার",
};

export default function AdminSettingsPage() {
  const user = useAdminUser();

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">সেটিংস</h1>
      <p className="mt-1 text-sm text-cream-100/60">তোমার অ্যাকাউন্টের তথ্য</p>

      <div className="mt-6 max-w-md space-y-4 border border-cream-50/10 bg-emerald-950/40 p-5">
        <div>
          <p className="text-xs text-cream-100/50">নাম</p>
          <p className="mt-0.5 text-cream-50">{user.name || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-cream-100/50">ইমেইল</p>
          <p className="mt-0.5 text-cream-50">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-cream-100/50">রোল</p>
          <p className="mt-0.5 text-cream-50">{ROLE_LABELS[user.role] ?? user.role}</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-cream-100/50">
        নাম বদলাতে বা পাসওয়ার্ড রিসেট করতে হলে Firebase Console → Authentication থেকে করতে হবে।
      </p>
    </div>
  );
}
