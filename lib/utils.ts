import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind ক্লাস কনফ্লিক্ট ছাড়া কন্ডিশনালি জোড়া দেওয়ার হেল্পার
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
