import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded border border-ink-900/15 bg-white px-4 py-2.5 font-body text-ink-900",
          "placeholder:text-ink-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
