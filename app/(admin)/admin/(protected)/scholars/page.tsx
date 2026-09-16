"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Scholar } from "@/types/scholar";

const EMPTY_FORM = { name: "", designation: "", bio: "", credentials: "" };

export default function AdminScholarsPage() {
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/scholars").then((r) => r.json()).then(setScholars);
  }

  useEffect(load, []);

  function startEdit(scholar: Scholar) {
    setEditingSlug(scholar.slug);
    setForm({
      name: scholar.name,
      designation: scholar.designation ?? "",
      bio: scholar.bio ?? "",
      credentials: scholar.credentials ?? "",
    });
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setError(null);

    const res = await fetch(
      editingSlug ? `/api/admin/scholars/${editingSlug}` : "/api/admin/scholars",
      {
        method: editingSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "সংরক্ষণ ব্যর্থ হয়েছে");
      return;
    }

    cancelEdit();
    load();
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("এই আলেমকে মুছে ফেলতে চাও?")) return;
    await fetch(`/api/admin/scholars/${slug}`, { method: "DELETE" });
    if (editingSlug === slug) cancelEdit();
    load();
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">মুফতি/আলেমগণ</h1>
      <p className="mt-1 text-sm text-cream-100/60">যাচাইকৃত আলেমদের প্রোফাইল ব্যবস্থাপনা করো</p>

      <div className="mt-6 space-y-2">
        {scholars.map((scholar) => (
          <div key={scholar.slug} className="border border-cream-50/10 bg-emerald-950/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-cream-50">{scholar.name}</p>
                <p className="text-sm text-cream-100/60">{scholar.designation}</p>
              </div>
              <div className="flex shrink-0 gap-3 text-sm">
                <button type="button" onClick={() => startEdit(scholar)} className="text-emerald-300 hover:underline">
                  এডিট
                </button>
                <button type="button" onClick={() => handleDelete(scholar.slug)} className="text-red-400 hover:underline">
                  মুছুন
                </button>
              </div>
            </div>
          </div>
        ))}

        {scholars.length === 0 && (
          <p className="text-cream-100/50">এখনো কোনো আলেম যোগ করা হয়নি।</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
        <h2 className="font-heading text-lg text-cream-50">
          {editingSlug ? "আলেমের তথ্য এডিট করো" : "নতুন আলেম যোগ করো"}
        </h2>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Input
          placeholder="নাম"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="bg-cream-50 text-ink-900"
        />
        <Input
          placeholder="পদবি (যেমন: মুফতি ও ফিকহ গবেষক)"
          value={form.designation}
          onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
          className="bg-cream-50 text-ink-900"
        />
        <Textarea
          placeholder="সংক্ষিপ্ত পরিচিতি"
          rows={3}
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          className="bg-cream-50 text-ink-900"
        />
        <Input
          placeholder="শিক্ষাগত যোগ্যতা"
          value={form.credentials}
          onChange={(e) => setForm((f) => ({ ...f, credentials: e.target.value }))}
          className="bg-cream-50 text-ink-900"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100"
          >
            {editingSlug ? "আপডেট করো" : "যোগ করো"}
          </button>
          {editingSlug && (
            <button type="button" onClick={cancelEdit} className="text-sm text-cream-100/60 hover:underline">
              বাতিল
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
