"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserByEmail } from "@/lib/admin-users-store";
import { UserRole } from "@/types/user";

interface RoleGuardProps {
  allow: UserRole[];
  children: ReactNode;
}

// এই কম্পোনেন্টটা /admin এর যেকোনো সাব-পেজে বসিয়ে নির্দিষ্ট রোলের জন্য
// সীমাবদ্ধ করা যায় — যেমন এখানে /admin/users শুধু superadmin দেখতে পারবে।
// TODO: বাস্তবে এই চেক Firestore-এর "users" কালেকশন থেকে uid দিয়ে হবে,
// এখন ডেমোর জন্য ইমেইল দিয়ে lib/admin-users-store.ts এ খোঁজা হচ্ছে।
export function RoleGuard({ allow, children }: RoleGuardProps) {
  const [state, setState] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.email) {
        setState("denied");
        return;
      }
      const record = getUserByEmail(firebaseUser.email);
      setState(record && allow.includes(record.role) ? "allowed" : "denied");
    });
    return unsubscribe;
  }, [allow]);

  if (state === "checking") {
    return <p className="text-cream-100/60">যাচাই করা হচ্ছে...</p>;
  }

  if (state === "denied") {
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
