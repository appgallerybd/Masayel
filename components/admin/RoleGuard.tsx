"use client";

import { ReactNode } from "react";
import { useAdminUser } from "@/lib/admin-user-context";
import { UserRole } from "@/types/user";

interface RoleGuardProps {
  allow: UserRole[];
  children: ReactNode;
}

// (protected)/layout.tsx সার্ভার-সাইডে ইউজারের রোল যাচাই করে AdminUserProvider-এ
// বসিয়ে দেয় — এই কম্পোনেন্ট সেই ভেরিফায়েড রোল পড়ে নির্দিষ্ট সাব-পেজ
// সীমাবদ্ধ করে (যেমন /admin/users শুধু superadmin)।
export function RoleGuard({ allow, children }: RoleGuardProps) {
  const user = useAdminUser();

  if (!allow.includes(user.role)) {
    return (
      <div className="border border-cream-50/10 bg-emerald-950/40 p-6">
        <p className="text-cream-50">এই পেজটি দেখার অনুমতি তোমার নেই।</p>
        <p className="mt-1 text-sm text-cream-100/60">
          এটা শুধু নির্দিষ্ট রোলের ইউজারদের জন্য সংরক্ষিত।
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
