import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminUserProvider } from "@/lib/admin-user-context";
import { getSessionUser } from "@/lib/admin-session";

const ADMIN_PANEL_ROLES = ["superadmin", "admin", "moderator", "scholar"];

// এটা সার্ভার কম্পোনেন্ট — httpOnly "session" কুকি firebase-admin দিয়ে
// যাচাই হয় এখানে, ব্রাউজারে কোনো সংবেদনশীল কিছু এক্সপোজ হয় না।
// এই লেআউট শুধু (protected) গ্রুপের পেজগুলোতে প্রযোজ্য — /admin/login এর বাইরে।
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!ADMIN_PANEL_ROLES.includes(user.role)) {
    redirect("/admin/login?error=no-access");
  }

  return (
    <AdminUserProvider value={user}>
      <AdminShell>{children}</AdminShell>
    </AdminUserProvider>
  );
}
