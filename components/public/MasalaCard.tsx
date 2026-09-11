import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface MasalaCardProps {
  slug: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
}

export function MasalaCard({ slug, title, excerpt, categoryLabel }: MasalaCardProps) {
  return (
    <Link href={`/masala/${slug}`} className="block">
      <Card className="h-full transition-colors hover:border-emerald-700/30">
        <Badge>{categoryLabel}</Badge>
        <h3 className="mt-3 font-heading text-lg leading-snug text-emerald-950">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-600">{excerpt}</p>
      </Card>
    </Link>
  );
}
