"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AdminQuestion {
  id: string;
  questionText: string;
  categorySlug: string;
  askedByName: string | null;
  askedByEmail: string | null;
  status: "pending" | "answered" | "rejected";
  createdAt: string;
}

const STATUS_LABELS: Record<AdminQuestion["status"], string> = {
  pending: "অপেক্ষমাণ",
  answered: "উত্তর দেওয়া হয়েছে",
  rejected: "প্রত্যাখ্যাত",
};

function StatusBadge({ status }: { status: AdminQuestion["status"] }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-2 py-0.5 text-xs",
        status === "pending" && "bg-gold-600/20 text-gold-400",
        status === "answered" && "bg-emerald-700/30 text-emerald-300",
        status === "rejected" && "bg-red-500/20 text-red-300"
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<AdminQuestion[] | null>(null);

  function load() {
    fetch("/api/admin/questions").then((r) => r.json()).then(setQuestions);
  }

  useEffect(load, []);

  async function handleStatusChange(id: string, status: AdminQuestion["status"]) {
    await fetch(`/api/admin/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("এই প্রশ্নটি মুছে ফেলতে চাও?")) return;
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">প্রশ্নসমূহ</h1>
      <p className="mt-1 text-sm text-cream-100/60">ইউজারদের জমা দেওয়া প্রশ্ন দেখো ও ব্যবস্থাপনা করো</p>

      {questions === null && <p className="mt-8 text-cream-100/50">লোড হচ্ছে...</p>}
      {questions?.length === 0 && (
        <p className="mt-8 text-cream-100/50">এখনো কোনো প্রশ্ন জমা পড়েনি।</p>
      )}

      <div className="mt-6 space-y-3">
        {questions?.map((q) => (
          <div key={q.id} className="border border-cream-50/10 bg-emerald-950/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-cream-50">{q.questionText}</p>
              <StatusBadge status={q.status} />
            </div>

            <p className="mt-2 text-sm text-cream-100/50">
              {q.askedByName || "নামহীন"}
              {q.askedByEmail && ` — ${q.askedByEmail}`}
              {" · "}
              {q.categorySlug}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Select
                value={q.status}
                onChange={(e) => handleStatusChange(q.id, e.target.value as AdminQuestion["status"])}
                className="w-auto bg-cream-50 text-ink-900"
              >
                <option value="pending">অপেক্ষমাণ</option>
                <option value="answered">উত্তর দেওয়া হয়েছে</option>
                <option value="rejected">প্রত্যাখ্যাত</option>
              </Select>
              <button
                type="button"
                onClick={() => handleDelete(q.id)}
                className="text-sm text-red-400 hover:underline"
              >
                মুছে ফেলুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
