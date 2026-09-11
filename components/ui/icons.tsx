// ছোট, নির্ভরযোগ্য SVG আইকন সেট — ইমোজির পরিবর্তে।
// প্রতিটা stroke-based, currentColor ব্যবহার করে যাতে প্যারেন্টের টেক্সট-কালার অনুসরণ করে।

interface IconProps {
  className?: string;
}

export function BookmarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75V21l-6-3.75L6 21V3.75Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.7 15.8 6.3M8.2 13.3l7.6 4.4" />
    </svg>
  );
}

export function PrintIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M6 9V3h12v6M6 18H4.5A1.5 1.5 0 0 1 3 16.5v-5A1.5 1.5 0 0 1 4.5 10h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H18M6 14h12v7H6v-7Z" strokeLinejoin="round" />
    </svg>
  );
}

export function VerifiedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2.5c1 1.2 2.4 1.8 4 1.7.6 1.4 1.7 2.5 3.1 3.1-.1 1.6.5 3 1.7 4-1.2 1-1.8 2.4-1.7 4-1.4.6-2.5 1.7-3.1 3.1-1.6-.1-3 .5-4 1.7-1-1.2-2.4-1.8-4-1.7-.6-1.4-1.7-2.5-3.1-3.1.1-1.6-.5-3-1.7-4 1.2-1 1.8-2.4 1.7-4 1.4-.6 2.5-1.7 3.1-3.1 1.6.1 3-.5 4-1.7Z" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
