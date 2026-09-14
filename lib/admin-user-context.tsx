"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserRole } from "@/types/user";

export interface AdminUserContextValue {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
}

const AdminUserContext = createContext<AdminUserContextValue | null>(null);

export function AdminUserProvider({
  value,
  children,
}: {
  value: AdminUserContextValue;
  children: ReactNode;
}) {
  return <AdminUserContext.Provider value={value}>{children}</AdminUserContext.Provider>;
}

export function useAdminUser() {
  const ctx = useContext(AdminUserContext);
  if (!ctx) {
    throw new Error("useAdminUser must be used inside AdminUserProvider");
  }
  return ctx;
}
