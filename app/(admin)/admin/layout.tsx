// এই আউটার লেআউটটা /admin এর সব পেজে (লগইনসহ) প্রযোজ্য — এখানে কোনো
// auth check বা sidebar নেই। আসল প্রোটেকশন ও sidebar আছে
// (protected)/layout.tsx তে, যেটা শুধু লগইন করা পেজগুলোতে প্রযোজ্য।
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-ink-900 text-cream-50">{children}</div>;
}
