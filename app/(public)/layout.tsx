import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { BottomNav } from "@/components/public/BottomNav";

// পাবলিক ওয়েবসাইটের সব পেজ এই লেআউটের ভেতর দিয়ে রেন্ডার হবে।
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
