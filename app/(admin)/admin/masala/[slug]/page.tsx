"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MasalaEditor } from "@/components/admin/MasalaEditor";
import { getMasalaBySlug } from "@/lib/admin-store";
import { MockMasalaDetail } from "@/lib/mock-data";

export default function EditMasalaPage() {
  const params = useParams<{ slug: string }>();
  const [masala, setMasala] = useState<MockMasalaDetail | null | undefined>(undefined);

  useEffect(() => {
    setMasala(getMasalaBySlug(params.slug) ?? null);
  }, [params.slug]);

  return (
    <div>
      <Link href="/admin/masala" className="text-sm text-emerald-300 hover:underline">
        ← সব মাসআলা
      </Link>

      {masala === undefined && (
        <p className="mt-6 text-cream-100/60">লোড হচ্ছে...</p>
      )}

      {masala === null && (
        <p className="mt-6 text-cream-100/60">এই মাসআলাটি খুঁজে পাওয়া যায়নি।</p>
      )}

      {masala && (
        <>
          <h1 className="mt-3 font-heading text-2xl text-cream-50">{masala.title} এডিট করো</h1>
          <div className="mt-6 max-w-2xl">
            <MasalaEditor mode="edit" initial={masala} />
          </div>
        </>
      )}
    </div>
  );
}
