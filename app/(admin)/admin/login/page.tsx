"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      // Firebase ID টোকেন নিয়ে সার্ভারে সেশন কুকি বসানো — middleware.ts এটাই চেক করে।
      // TODO: এখানে একটা /api/session route বানিয়ে httpOnly কুকি সেট করতে হবে
      // (firebase-admin দিয়ে createSessionCookie ব্যবহার করে), ক্লায়েন্ট-সাইড
      // কুকি নিরাপদ নয় — এটা শুধু ধাপে ধাপে এগোনোর জন্য অস্থায়ী।
      const idToken = await credential.user.getIdToken();
      document.cookie = `session=${idToken}; path=/; max-age=3600; samesite=lax`;

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
        <h1 className="text-center font-heading text-2xl text-cream-50">
          অ্যাডমিন লগইন
        </h1>
        <p className="mt-1 text-center text-sm text-cream-100/60">
          মাসআলা শেয়ারিং — অ্যাডমিন প্যানেল
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
  );
}
