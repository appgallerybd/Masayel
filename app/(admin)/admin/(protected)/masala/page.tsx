"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Masala } from "@/types/masala";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: Masala["status"] }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-2 py-0.5 text-xs",
        status === "published"
          ? "bg-emerald-700/30 text-emerald-300"
          : "bg-gold-600/20 text-gold-400"
      )}
    >
      {status === "published" ? "প্রকাশিত" : "খসড়া"}
    </span>
  );
}

export default function AdminMasalaListPage() {
  const [masalaList, setMasalaList] = useState<Masala[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/masala")
      .then((r) => r.json())
      .then(setMasalaList)
      .catch(() => setMasalaList([]));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-cream-50">মাসআলা</h1>
          <p className="mt-1 text-sm text-cream-100/60">সব মাসআলা ব্যবস্থাপনা করো</p>
        </div>
        <Link
          href="/admin/masala/new"
          className="inline-flex items-center justify-center rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100"
        >
          নতুন মাসআলা
        </Link>
      </div>

      {masalaList === null && (
        <p className="mt-8 text-center text-cream-100/50">লোড হচ্ছে...</p>
      )}

      {masalaList !== null && masalaList.length === 0 && (
        <p className="mt-8 text-center text-cream-100/50">এখনো কোনো মাসআলা যোগ করা হয়নি।</p>
      )}

      {masalaList && masalaList.length > 0 && (
        <>
          {/* মোবাইল — কার্ড লিস্ট */}
          <div className="mt-6 space-y-3 sm:hidden">
            {masalaList.map((masala) => (
              <Link
                key={masala.slug}
                href={`/admin/masala/${masala.slug}`}
                className="block border border-cream-50/10 bg-emerald-950/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-cream-50">{masala.title}</p>
                  <StatusBadge status={masala.status} />
                </div>
              </Link>
            ))}
          </div>

          {/* ডেস্কটপ — টেবিল */}
          <div className="mt-6 hidden overflow-x-auto border border-cream-50/10 sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-50/5 text-cream-100/60">
                <tr>
                  <th className="px-4 py-3 font-normal">শিরোনাম</th>
                  <th className="px-4 py-3 font-normal">স্ট্যাটাস</th>
                  <th className="px-4 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {masalaList.map((masala) => (
                  <tr key={masala.slug} className="border-t border-cream-50/10">
                    <td className="px-4 py-3 text-cream-50">{masala.title}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={masala.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/masala/${masala.slug}`} className="text-emerald-300 hover:underline">
                        এডিট
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
