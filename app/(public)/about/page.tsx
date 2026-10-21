import Link from "next/link";
import { BookOpen, CheckCircle2, ShieldCheck, Users } from "lucide-react";

export const metadata = {
  title: "আমাদের সম্পর্কে",
  description: "মাসায়েল২৪-এর উদ্দেশ্য, সম্পাদকীয় নীতি এবং দ্বীনি তথ্য প্রকাশের দায়িত্বশীল পদ্ধতি।",
};

const principles = [
  { icon: BookOpen, title: "সূত্রের স্বচ্ছতা", body: "প্রকাশিত আলোচনায় প্রযোজ্য ক্ষেত্রে মূল কিতাব, খণ্ড, পৃষ্ঠা ও অন্যান্য যাচাইযোগ্য তথ্য উল্লেখ করার নীতি অনুসরণ করা উচিত।" },
  { icon: Users, title: "যোগ্য আলেমের পর্যালোচনা", body: "ফতোয়ার বিষয়বস্তু প্রকাশের আগে দায়িত্বপ্রাপ্ত যোগ্য আলেমের পর্যালোচনা এবং অনুমোদনের ব্যবস্থা থাকা জরুরি।" },
  { icon: ShieldCheck, title: "গোপনীয়তা ও দায়িত্বশীলতা", body: "প্রশ্নকারীর ব্যক্তিগত তথ্য অপ্রয়োজনে প্রকাশ করা হবে না। ব্যক্তিগত পরিস্থিতিনির্ভর মাসআলায় সরাসরি যোগ্য মুফতির পরামর্শ নেওয়া উচিত।" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 md:py-16">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900"><BookOpen className="h-4 w-4" /> মাসায়েল২৪ পরিচিতি</div>
      <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl">দ্বীনি জ্ঞান চর্চায় স্বচ্ছতা ও দায়িত্বশীলতা</h1>
      <p className="mt-5 text-base leading-8 text-ink-600">মাসায়েল২৪ বাংলা ভাষাভাষী পাঠকদের জন্য বিষয়ভিত্তিক মাসআলা, দ্বীনি আলোচনা এবং প্রাসঙ্গিক সূত্র সহজে খুঁজে পাওয়ার একটি প্ল্যাটফর্ম। আমাদের লক্ষ্য হলো পাঠককে তথ্য খুঁজে পেতে সহায়তা করা এবং উৎস যাচাইয়ের গুরুত্ব তুলে ধরা।</p>
      <div className="mt-9 grid gap-4 sm:grid-cols-3">
        {principles.map(({ icon: Icon, title, body }) => (
          <section key={title} className="rounded-2xl border border-emerald-950/10 bg-white p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-4 font-heading text-lg font-semibold text-emerald-950">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-ink-600">{body}</p>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-2xl border border-gold-400/40 bg-[#f7f4e9] p-5 sm:p-7">
        <h2 className="font-heading text-xl font-semibold text-emerald-950">ফতোয়া প্রকাশের নীতি</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
          <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /> প্রশ্নের প্রেক্ষাপট ও প্রয়োজনীয় শর্তকে গুরুত্ব দেওয়া।</li>
          <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /> সম্ভব হলে মূল সূত্র এবং উদ্ধৃতির অবস্থান উল্লেখ করা।</li>
          <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /> ভুল বা অসম্পূর্ণ তথ্য শনাক্ত হলে সংশোধনের ব্যবস্থা রাখা।</li>
          <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /> জটিল বা ব্যক্তিগত মাসআলায় ওয়েবসাইটের সাধারণ লেখা ব্যক্তিগত ফতোয়ার বিকল্প নয়—এটি স্পষ্ট রাখা।</li>
        </ul>
        <p className="mt-4 text-xs leading-6 text-ink-600">দ্রষ্টব্য: এই নীতিমালা সাইট পরিচালনার জন্য প্রকাশিত নীতিগত প্রত্যাশা। সংশ্লিষ্ট পর্যালোচনা-ব্যবস্থা বাস্তবে চালু ও যাচাই না হওয়া পর্যন্ত কোনো নির্দিষ্ট ফতোয়া বোর্ডের অনুমোদন ধরে নেওয়া উচিত নয়।</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/categories" className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">বিষয়সমূহ দেখুন</Link>
        <Link href="/ask" className="rounded-xl border border-emerald-950/15 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50">প্রশ্ন জমা দিন</Link>
      </div>
    </div>
  );
}
