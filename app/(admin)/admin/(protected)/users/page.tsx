"use client";

import { FormEvent, useEffect, useState } from "react";
import { RoleGuard } from "@/components/admin/RoleGuard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AppUser, UserRole } from "@/types/user";

const ROLES: UserRole[] = ["superadmin", "admin", "moderator", "scholar", "user"];

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "সুপার অ্যাডমিন",
  admin: "অ্যাডমিন",
  moderator: "মডারেটর",
  scholar: "আলেম",
  user: "সাধারণ ইউজার",
};

function RoleSelect({
  value,
  onChange,
}: {
  value: UserRole;
  onChange: (role: UserRole) => void;
}) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as UserRole)}
      className="bg-cream-50 text-ink-900"
    >
      {ROLES.map((role) => (
        <option key={role} value={role}>
          {ROLE_LABELS[role]}
        </option>
      ))}
    </Select>
  );
}

function UsersTable() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("moderator");

  function loadUsers() {
    fetch("/api/admin/users").then((r) => r.json()).then(setUsers);
  }

  useEffect(loadUsers, []);

  async function handleRoleChange(uid: string, role: UserRole) {
    await fetch(`/api/admin/users/${uid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    loadUsers();
  }

  async function handleRemove(uid: string) {
    if (!window.confirm("এই ইউজারকে সরিয়ে দিতে চাও?")) return;
    await fetch(`/api/admin/users/${uid}`, { method: "DELETE" });
    loadUsers();
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail, role: newRole }),
    });

    setNewName("");
    setNewEmail("");
    setNewRole("moderator");
    loadUsers();
  }

  return (
    <div>
      {/* মোবাইল — কার্ড লিস্ট */}
      <div className="space-y-3 sm:hidden">
        {users.map((user) => (
          <div key={user.uid} className="border border-cream-50/10 bg-emerald-950/40 p-4">
            <p className="text-cream-50">{user.name}</p>
            <p className="mt-0.5 truncate text-sm text-cream-100/60">{user.email}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <RoleSelect value={user.role} onChange={(role) => handleRoleChange(user.uid, role)} />
              </div>
              <button onClick={() => handleRemove(user.uid)} className="shrink-0 text-sm text-red-400 hover:underline">
                সরান
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ডেস্কটপ — টেবিল */}
      <div className="hidden overflow-x-auto border border-cream-50/10 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50/5 text-cream-100/60">
            <tr>
              <th className="px-4 py-3 font-normal">নাম</th>
              <th className="px-4 py-3 font-normal">ইমেইল</th>
              <th className="px-4 py-3 font-normal">রোল</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-t border-cream-50/10">
                <td className="px-4 py-3 text-cream-50">{user.name}</td>
                <td className="px-4 py-3 text-cream-100/70">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleSelect value={user.role} onChange={(role) => handleRoleChange(user.uid, role)} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleRemove(user.uid)} className="text-red-400 hover:underline">
                    সরান
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAdd} className="mt-8 max-w-md space-y-4">
        <h2 className="font-heading text-lg text-cream-50">নতুন ইউজার/রোল যোগ করো</h2>
        <Input placeholder="নাম" value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-cream-50 text-ink-900" />
        <Input type="email" placeholder="ইমেইল" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="bg-cream-50 text-ink-900" />
        <RoleSelect value={newRole} onChange={setNewRole} />
        <button type="submit" className="w-full rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100 sm:w-auto">
          যোগ করুন
        </button>
      </form>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">ইউজার ও রোল</h1>
      <p className="mt-1 text-sm text-cream-100/60">কে কোন পর্যায়ে অ্যাক্সেস পাবে তা এখান থেকে নিয়ন্ত্রণ করো</p>
      <div className="mt-6">
        <RoleGuard allow={["superadmin"]}>
          <UsersTable />
        </RoleGuard>
      </div>
    </div>
  );
}
