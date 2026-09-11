"use client";

import { FormEvent, useEffect, useState } from "react";
import { RoleGuard } from "@/components/admin/RoleGuard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AppUser, UserRole } from "@/types/user";
import { addUser, getAllUsers, removeUser, updateUserRole } from "@/lib/admin-users-store";

const ROLES: UserRole[] = ["superadmin", "admin", "moderator", "scholar", "user"];

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "সুপার অ্যাডমিন",
  admin: "অ্যাডমিন",
  moderator: "মডারেটর",
  scholar: "আলেম",
  user: "সাধারণ ইউজার",
};

function UsersTable() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("moderator");

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  function handleRoleChange(uid: string, role: UserRole) {
    updateUserRole(uid, role);
    setUsers(getAllUsers());
  }

  function handleRemove(uid: string) {
    if (!window.confirm("এই ইউজারকে সরিয়ে দিতে চাও?")) return;
    removeUser(uid);
    setUsers(getAllUsers());
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    // TODO: বাস্তবে এখানে শুধু রোল-ইনভাইট রেকর্ড তৈরি হবে — আসল অ্যাকাউন্ট
    // তৈরি হবে যখন ওই ইমেইল দিয়ে প্রথমবার Firebase Auth-এ সাইন-ইন করবে।
    addUser({ name: newName, email: newEmail, role: newRole });
    setNewName("");
    setNewEmail("");
    setNewRole("moderator");
    setUsers(getAllUsers());
  }

  return (
    <div>
      <div className="overflow-hidden border border-cream-50/10">
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
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                    className="bg-cream-50 text-ink-900"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {ROLE_LABELS[role]}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemove(user.uid)}
                    className="text-red-400 hover:underline"
                  >
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
        <Input
          placeholder="নাম"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="bg-cream-50 text-ink-900"
        />
        <Input
          type="email"
          placeholder="ইমেইল"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="bg-cream-50 text-ink-900"
        />
        <Select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as UserRole)}
          className="bg-cream-50 text-ink-900"
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </Select>
        <button
          type="submit"
          className="rounded bg-cream-50 px-5 py-2.5 font-body font-medium text-emerald-950 hover:bg-cream-100"
        >
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
      <p className="mt-1 text-cream-100/60">
        কে কোন পর্যায়ে অ্যাক্সেস পাবে তা এখান থেকে নিয়ন্ত্রণ করো
      </p>

      <div className="mt-6">
        <RoleGuard allow={["superadmin"]}>
          <UsersTable />
        </RoleGuard>
      </div>
    </div>
  );
}
