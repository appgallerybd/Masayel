import Link from "next/link";
import { MasalaEditor } from "@/components/admin/MasalaEditor";

export default function NewMasalaPage() {
  return (
    <div>
      <Link href="/admin/masala" className="text-sm text-emerald-300 hover:underline">
        ← সব মাসআলা
      </Link>
      <h1 className="mt-3 font-heading text-2xl text-cream-50">নতুন মাসআলা</h1>

      <div className="mt-6 max-w-2xl">
        <MasalaEditor mode="create" />
      </div>
    </div>
  );
}
