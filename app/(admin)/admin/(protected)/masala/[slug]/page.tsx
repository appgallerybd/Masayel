"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MasalaEditor } from "@/components/admin/MasalaEditor";
import { Masala } from "@/types/masala";

export default function EditMasalaPage() {
  const params = useParams<{ slug: string }>();
  const [masala, setMasala] = useState<Masala | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/admin/masala/${params.slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setMasala)
      .catch(() => setMasala(null));
  }, [params.slug]);

  return (
    <div>
      <Link href="/admin/masala" className="text-sm text-emerald-300 hover:underline">
        ← সব মাসআলা
      </Link>

      {masala === undefined && <p className="mt-6 text-cream-100/60">লোড হচ্ছে...</p>}
      {masala === null && <p className="mt-6 text-cream-100/60">এই মাসআলাটি খুঁজে পাওয়া যায়নি।</p>}

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
