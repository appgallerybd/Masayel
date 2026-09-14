import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean; // ব্যবহার করা হয় না রেখে দেওয়া হয়েছে backward-compat এর জন্য
}

// কার্ড ইচ্ছাকৃতভাবে শান্ত/নিরাভরণ রাখা হয়েছে — এই প্রজেক্টের একমাত্র
// "সাহসী" ভিজ্যুয়াল এলিমেন্ট হলো ArchRow (দেখো components/ui/arch.tsx),
// তাই কার্ডে আলাদা করে কোনো ডেকোরেশন যোগ করা হয়নি।
export function Card({ className, accent: _accent, children, ...props }: CardProps) {
  return (
    <div className={cn("border border-ink-900/10 bg-white/60 p-5", className)} {...props}>
      {children}
    </div>
  );
}
