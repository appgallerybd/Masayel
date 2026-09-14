import { cn } from "@/lib/utils";

/**
 * এই প্রজেক্টের মূল সিগনেচার মোটিফ — মসজিদের খিলান/আর্কেডের সিলুয়েট।
 * সাধারণত একটা গাঢ় সেকশনের নিচের প্রান্তে বসিয়ে পরের (হালকা) সেকশনে
 * রূপান্তর তৈরি করা হয় — যেমন হোমপেজের হিরো সেকশনের নিচে।
 * এটাই এই ডিজাইনের একমাত্র "সাহসী" এলিমেন্ট — তাই অন্য জায়গায় এটার
 * প্রতিদ্বন্দ্বী কোনো ভারী ডেকোরেশন রাখা হয়নি।
 */
export function ArchRow({ className }: { className?: string }) {
  const patternId = "masala-arch-row";

  return (
    <svg
      viewBox="0 0 240 60"
      preserveAspectRatio="none"
      className={cn("block h-14 w-full text-cream-50", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M0 60 L0 30 C0 13.4 13.4 0 30 0 C46.6 0 60 13.4 60 30 L60 60 Z"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="240" height="60" fill={`url(#${patternId})`} />
    </svg>
  );
}

/** একটা একক খিলান — ছোট আইকন হিসেবে ব্যবহারের জন্য (যেমন ফিচার্ড কার্ডের উপরে) */
export function ArchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("h-8 w-8", className)} aria-hidden="true">
      <path
        d="M0 60 L0 30 C0 13.4 13.4 0 30 0 C46.6 0 60 13.4 60 30 L60 60 Z"
        fill="currentColor"
      />
    </svg>
  );
}
