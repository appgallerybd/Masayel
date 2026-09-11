import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { VerifiedIcon } from "./icons";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "verified";
}

export function Badge({ className, tone = "neutral", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2.5 py-1 text-sm font-body",
        tone === "neutral" && "bg-emerald-100 text-emerald-800",
        tone === "verified" && "bg-gold-600/10 text-gold-600",
        className
      )}
      {...props}
    >
      {tone === "verified" && <VerifiedIcon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
