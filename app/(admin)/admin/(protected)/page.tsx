import { StatsCard } from "@/components/admin/StatsCard";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

export default async function AdminDashboardPage() {
  const [masalaSnap, categoriesSnap, scholarsSnap, pendingQuestionsSnap] = await Promise.all([
    adminDb.collection(COLLECTIONS.masala).count().get(),
    adminDb.collection(COLLECTIONS.categories).count().get(),
    adminDb.collection(COLLECTIONS.scholars).count().get(),
    adminDb.collection(COLLECTIONS.questions).where("status", "==", "pending").count().get(),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl text-cream-50">ড্যাশবোর্ড</h1>
      <p className="mt-1 text-cream-100/60">একনজরে প্ল্যাটফর্মের সারসংক্ষেপ</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="মোট মাসআলা" value={masalaSnap.data().count} />
        <StatsCard label="ক্যাটাগরি" value={categoriesSnap.data().count} />
        <StatsCard label="যাচাইকৃত আলেম" value={scholarsSnap.data().count} />
        <StatsCard label="অপেক্ষমাণ প্রশ্ন" value={pendingQuestionsSnap.data().count} />
      </div>
    </div>
  );
}
