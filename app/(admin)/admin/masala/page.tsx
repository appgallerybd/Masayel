"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllMasala } from "@/lib/admin-store";
import { MockMasalaDetail } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AdminMasalaListPage() {
  const [masalaList, setMasalaList] = useState<MockMasalaDetail[] | null>(null);

  useEffect(() => {
    setMasalaList(getAllMasala());
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-cream-50">মাসআলা</h1>
          <p className="mt-1 text-cream-100/60">সব মাসআলা ব্যবস্থাপনা করো</p>
        </div>
        <Link
          href="/admin/masala/new"
          className="rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100"
        >
          নতুন মাসআলা
        </Link>
      </div>

      <div className="mt-6 overflow-hidden border border-cream-50/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50/5 text-cream-100/60">
            <tr>
              <th className="px-4 py-3 font-normal">শিরোনাম</th>
              <th className="px-4 py-3 font-normal">ক্যাটাগরি</th>
              <th className="px-4 py-3 font-normal">স্ট্যাটাস</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {masalaList === null && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-cream-100/50">
                  লোড হচ্ছে...
                </td>
              </tr>
            )}

            {masalaList !== null && masalaList.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-cream-100/50">
                  এখনো কোনো মাসআলা যোগ করা হয়নি।
                </td>
              </tr>
            )}

            {masalaList?.map((masala) => (
              <tr key={masala.slug} className="border-t border-cream-50/10">
                <td className="px-4 py-3 text-cream-50">{masala.title}</td>
                <td className="px-4 py-3 text-cream-100/70">{masala.categoryLabel}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs",
                      masala.status === "published"
                        ? "bg-emerald-700/30 text-emerald-300"
                        : "bg-gold-600/20 text-gold-400"
                    )}
                  >
                    {masala.status === "published" ? "প্রকাশিত" : "খসড়া"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/masala/${masala.slug}`}
                    className="text-emerald-300 hover:underline"
                  >
                    এডিট
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
