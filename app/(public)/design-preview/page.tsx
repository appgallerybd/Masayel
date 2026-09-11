import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GeometricDivider } from "@/components/ui/divider";
import { BookmarkIcon, ShareIcon, PrintIcon, SearchIcon } from "@/components/ui/icons";

// ⚠️ এটা শুধু ধাপ ২ যাচাই করার জন্য একটা অস্থায়ী পেজ — পরে মুছে ফেলা হবে।
export default function DesignPreviewPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-16">
      <section>
        <h1 className="text-3xl">ডিজাইন সিস্টেম প্রিভিউ</h1>
        <p className="mt-2 text-ink-600">
          এমারেল্ড/গোল্ড প্যালেট, বাংলা টাইপোগ্রাফি, আর বেসিক কম্পোনেন্ট — একনজরে
        </p>
      </section>

      <GeometricDivider />

      <section className="space-y-3">
        <h2 className="text-xl">বাটন</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">প্রকাশ করুন</Button>
          <Button variant="secondary">সংরক্ষণ করুন</Button>
          <Button variant="ghost">বাতিল</Button>
          <Button variant="primary" size="sm">
            <BookmarkIcon className="h-4 w-4" />
            সংরক্ষণ
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl">ব্যাজ</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>হানাফি</Badge>
          <Badge>নামাজ</Badge>
          <Badge tone="verified">যাচাইকৃত মুফতি</Badge>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl">কার্ড</h2>
        <Card accent>
          <Badge>ওযু</Badge>
          <h3 className="mt-3 text-lg text-emerald-950">
            ওযু ভঙ্গের কারণসমূহ কী কী?
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            ওযু ভঙ্গের প্রধান কারণগুলোর মধ্যে রয়েছে— পেশাব-পায়খানার রাস্তা দিয়ে কিছু
            বের হওয়া, গভীর ঘুম, রক্ত প্রবাহিত হওয়া ইত্যাদি...
          </p>
          <div className="mt-4 flex items-center gap-4 text-ink-400">
            <ShareIcon className="h-4 w-4" />
            <PrintIcon className="h-4 w-4" />
            <BookmarkIcon className="h-4 w-4" />
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl">ইনপুট / সার্চ</h2>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <Input placeholder="মাসআলা খুঁজুন..." className="pl-9" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl">টাইপোগ্রাফি</h2>
        <div className="space-y-2">
          <h1>হেডিং ১ — এমারেল্ড সেরিফ</h1>
          <h2>হেডিং ২</h2>
          <p className="font-body">
            এটা বডি টেক্সট — Hind Siliguri ফন্টে, সাধারণ পড়ার জন্য পরিষ্কার ও আরামদায়ক।
          </p>
        </div>
      </section>
    </div>
  );
}
