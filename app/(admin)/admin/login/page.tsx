"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Input } from "@/components/ui/input";
import { ArchIcon } from "@/components/ui/arch";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "no-access"
      ? "তোমার অ্যাকাউন্টের অ্যাডমিন প্যানেল দেখার অনুমতি নেই।"
      : null
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error("session exchange failed");
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <ArchIcon className="h-10 w-10 text-gold-400" />
        </div>
        <h1 className="mt-4 text-center font-heading text-2xl text-cream-50">
          অ্যাডমিন লগইন
        </h1>
        <p className="mt-1 text-center text-sm text-cream-100/60">
          মাসআলা শেয়ারিং — অ্যাডমিন প্যানেল
        </p>

        <div className="mt-8 border border-cream-50/10 bg-emerald-950/40 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-cream-100/70">
              ইমেইল
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-cream-100/70">
              পাসওয়ার্ড
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 transition-colors hover:bg-cream-100 disabled:opacity-50"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
