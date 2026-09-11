import { StatsCard } from "@/components/admin/StatsCard";
import { CATEGORIES, MASALA_LIST, SCHOLARS } from "@/lib/mock-data";

// ⚠️ স্ট্যাটগুলো এখন মক ডেটা থেকে গণনা হচ্ছে — Firestore যুক্ত হলে
// আসল কালেকশনের count ব্যবহার হবে (getCountFromServer দিয়ে)।
export default function AdminDashboardPage() {
  const pendingQuestionsCount = 3; // মক — প্রশ্ন ম্যানেজমেন্ট (ধাপ ৯গ/ঘ পরে) থেকে আসবে

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">ড্যাশবোর্ড</h1>
      <p className="mt-1 text-cream-100/60">একনজরে প্ল্যাটফর্মের সারসংক্ষেপ</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="মোট মাসআলা" value={MASALA_LIST.length} />
        <StatsCard label="ক্যাটাগরি" value={CATEGORIES.length} />
        <StatsCard label="যাচাইকৃত আলেম" value={SCHOLARS.length} />
        <StatsCard label="অপেক্ষমাণ প্রশ্ন" value={pendingQuestionsCount} />
      </div>

      <div className="mt-10 border border-cream-50/10 bg-emerald-950/40 p-5">
        <h2 className="font-heading text-lg text-cream-50">পরবর্তী ধাপ</h2>
        <p className="mt-1 text-sm text-cream-100/60">
          এরপর মাসআলা ম্যানেজমেন্ট (তালিকা, নতুন যোগ, এডিট) এবং রোল-বেইজড
          ইউজার ম্যানেজমেন্ট তৈরি হবে।
        </p>
      </div>
    </div>
  );
}
