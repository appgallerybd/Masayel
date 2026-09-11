import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { GeometricDivider } from "./divider";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean; // উপরে জ্যামিতিক মোটিফ দেখাবে কিনা — সব কার্ডে না, নির্বাচিত/ফিচার্ড কার্ডে
}

export function Card({ className, accent = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-ink-900/10 bg-white/60 p-5",
        className
      )}
      {...props}
    >
      {accent && <GeometricDivider className="mb-4" />}
      {children}
    </div>
  );
}
