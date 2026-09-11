"use client";

import { useState } from "react";
import { ShareIcon, PrintIcon } from "@/components/ui/icons";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // ইউজার শেয়ার বাতিল করলে কিছু করার দরকার নেই
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-4 text-sm text-ink-400">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 hover:text-ink-900"
      >
        <ShareIcon className="h-4 w-4" />
        {copied ? "লিংক কপি হয়েছে" : "শেয়ার করুন"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 hover:text-ink-900"
      >
        <PrintIcon className="h-4 w-4" />
        প্রিন্ট
      </button>
    </div>
  );
}
