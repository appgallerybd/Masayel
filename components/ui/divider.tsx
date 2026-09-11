import { cn } from "@/lib/utils";

/**
 * এই প্রজেক্টের সিগনেচার মোটিফ — ইসলামিক জ্যামিতিক প্যাটার্ন থেকে অনুপ্রাণিত
 * একটা পাতলা, পুনরাবৃত্ত রম্বস-চেইন। কার্ডের উপরের বর্ডার আর সেকশন ব্রেকে
 * ব্যবহার হবে — কিন্তু এটাই একমাত্র "সাহসী" এলিমেন্ট, তাই সীমিতভাবে
 * ব্যবহার করা উচিত (সেকশন ব্রেকে, বেশি জায়গায় না)।
 */
export function GeometricDivider({ className }: { className?: string }) {
  const patternId = "masala-diamond-chain";

  return (
    <svg
      viewBox="0 0 240 12"
      className={cn("h-3 w-full text-emerald-700/40", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="240" height="12" fill={`url(#${patternId})`} />
    </svg>
  );
}
