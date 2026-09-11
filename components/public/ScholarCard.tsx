import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScholarCardProps {
  slug: string;
  name: string;
  designation: string;
}

export function ScholarCard({ slug, name, designation }: ScholarCardProps) {
  return (
    <Link href={`/scholars/${slug}`} className="block">
      <Card className="flex h-full items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-heading text-lg text-emerald-950">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-heading text-lg text-emerald-950">{name}</p>
          <Badge tone="verified" className="mt-1">
            {designation}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}
