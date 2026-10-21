import Link from "next/link";
import { ArrowUpRight, CircleHelp, Mail, MessageSquareText } from "lucide-react";

export const metadata = {
  title: "যোগাযোগ",
  description: "মাসায়েল২৪-এর সঙ্গে যোগাযোগের উপায় এবং দ্বীনি প্রশ্ন জমা দেওয়ার নির্দেশনা।",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800"><MessageSquareText className="h-6 w-6" /></div>
      <h1 className="mt-5 font-heading text-3xl font-bold text-emerald-950 sm:text-4xl">যোগাযোগ করুন</h1>
      <p className="mt-3 max-w-2xl leading-7 text-ink-600">দ্বীনি মাসআলা জানতে চাইলে প্রশ্ন জমা দেওয়ার পেজ ব্যবহার করুন। ওয়েবসাইটের কনটেন্ট, ভুল তথ্য বা প্রযুক্তিগত সমস্যার বিষয়ে যোগাযোগের তথ্য কর্তৃপক্ষের যাচাইকৃত ঠিকানা দিয়ে এখানে প্রকাশ করা উচিত।</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-emerald-950/10 bg-white p-6">
          <CircleHelp className="h-6 w-6 text-emerald-800" />
          <h2 className="mt-4 font-heading text-lg font-semibold text-emerald-950">দ্বীনি প্রশ্ন</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600">প্রশ্নের প্রেক্ষাপট স্পষ্টভাবে লিখুন। প্রয়োজনীয় তথ্য বাদ দেবেন না এবং অন্যের ব্যক্তিগত তথ্য অপ্রয়োজনে যুক্ত করবেন না।</p>
          <Link href="/ask" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">প্রশ্ন জমা দিন <ArrowUpRight className="h-4 w-4" /></Link>
        </section>
        <section className="rounded-2xl border border-emerald-950/10 bg-white p-6">
          <Mail className="h-6 w-6 text-emerald-800" />
          <h2 className="mt-4 font-heading text-lg font-semibold text-emerald-950">সাইট-সংক্রান্ত যোগাযোগ</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600">কর্তৃপক্ষের যাচাইকৃত ইমেইল বা ফোন নম্বর নিশ্চিত হওয়ার পর প্রকাশ করা হবে। ভুল বা অনুমানভিত্তিক যোগাযোগের তথ্য এখানে দেখানো হচ্ছে না।</p>
          <p className="mt-4 rounded-xl bg-cream-100 px-3 py-2 text-xs leading-5 text-ink-600">প্রশাসক: অনুগ্রহ করে সাইট সেটিংসে যাচাইকৃত যোগাযোগের তথ্য যুক্ত করুন।</p>
        </section>
      </div>
      <p className="mt-7 text-xs leading-6 text-ink-400">ব্যক্তিগত বা জরুরি শরয়ি বিষয়ে ওয়েবসাইটে উত্তর প্রকাশের অপেক্ষায় না থেকে সরাসরি যোগ্য আলেম বা মুফতির সঙ্গে যোগাযোগ করুন।</p>
    </div>
  );
}
