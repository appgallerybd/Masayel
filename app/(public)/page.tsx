import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, BookOpen, BookMarked,
  CheckCircle2, ChevronRight, CircleHelp, Compass, Feather,
  Landmark, Search, ShieldCheck, Sparkles, Users,
} from "lucide-react";
import { getCategories, getPublishedMasala } from "@/lib/firebase/reads";

const CATEGORY_ICONS = [BookOpen, Landmark, Compass, Feather, BookMarked, CircleHelp];

export default async function HomePage() {
  const [categories, masalaList] = await Promise.all([
    getCategories(),
    getPublishedMasala(7),
  ]);
  const [featured, ...recent] = masalaList;

  return (
    <div className="overflow-hidden">
      <section className="relative isolate bg-emerald-950 text-cream-50">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-20">
          <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-gold-400/50" />
          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full border border-gold-400/40" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-emerald-700/30 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-12 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:pb-20 md:pt-20">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-3 py-1.5 text-xs font-medium text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              জ্ঞান, আমানত ও দায়িত্বশীলতা
            </div>
            <h1 className="mt-6 max-w-2xl font-heading text-4xl font-semibold leading-[1.25] tracking-tight text-cream-50 sm:text-5xl md:text-6xl">
              দ্বীনি প্রশ্নের উত্তর,
              <span className="mt-2 block text-gold-400">বিশ্বস্ত সূত্রের আলোকে</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-cream-100/75 sm:text-lg">
              কুরআন, সুন্নাহ ও নির্ভরযোগ্য ফিকহি গ্রন্থের আলোকে মাসআলা খুঁজুন। পড়ুন, বুঝুন এবং প্রয়োজন হলে নিজের প্রশ্ন জমা দিন।
            </p>
            <form action="/search" className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20">
              <Search className="ml-3 h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
              <label htmlFor="home-search" className="sr-only">মাসআলা খুঁজুন</label>
              <input
                id="home-search"
                name="q"
                type="search"
                placeholder="কী জানতে চান? যেমন—ওযু, যাকাত, বিবাহ"
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 sm:text-base"
              />
              <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400">
                খুঁজুন <ArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            </form>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream-100/65 sm:text-sm">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-400" /> সূত্রভিত্তিক আলোচনা</span>
              <span className="inline-flex items-center gap-1.5"><BookMarked className="h-4 w-4 text-gold-400" /> বিষয়ভিত্তিক সংগ্রহ</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-gold-400" /> আলেমদের পরামর্শ</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:ml-auto">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6">
              <div className="rounded-[1.5rem] border border-gold-400/20 bg-[#103b2d] p-6 sm:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-400/35 bg-gold-400/10 text-gold-400">
                  <BookOpen className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <p className="mt-5 text-center text-xs font-semibold tracking-[0.2em] text-gold-400">MASAEL24</p>
                <p className="mt-3 text-center font-heading text-2xl leading-relaxed text-cream-50">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
                <p className="mt-2 text-center text-sm text-cream-100/65">“হে আমার রব, আমার জ্ঞান বৃদ্ধি করে দিন।”</p>
                <div className="mx-auto mt-6 h-px w-20 bg-gold-400/50" />
                <p className="mt-5 text-center text-sm leading-7 text-cream-100/75">জানার আগে যাচাই, বলার আগে দলিল—দ্বীনি জ্ঞান চর্চায় দায়িত্বশীলতার অঙ্গীকার।</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <BookMarked className="h-5 w-5 text-gold-400" />
                  <p className="mt-2 text-sm font-semibold text-cream-50">রেফারেন্সসহ</p>
                  <p className="mt-1 text-xs leading-5 text-cream-100/60">উৎস দেখুন, বুঝে পড়ুন</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <ShieldCheck className="h-5 w-5 text-gold-400" />
                  <p className="mt-2 text-sm font-semibold text-cream-50">যাচাইয়ের গুরুত্ব</p>
                  <p className="mt-1 text-xs leading-5 text-cream-100/60">তথ্য ও মতামত আলাদা রাখুন</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-gold-400/20 bg-cream-50 px-4 py-3 text-emerald-950 shadow-xl sm:flex sm:items-center sm:gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><CheckCircle2 className="h-5 w-5" /></span>
              <span><span className="block text-sm font-semibold">জ্ঞান হোক দায়িত্বশীল</span><span className="block text-xs text-ink-600">দলিল ও প্রেক্ষাপটের সঙ্গে</span></span>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="h-5 bg-cream-50 [clip-path:ellipse(60%_100%_at_50%_100%)]" />
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 md:space-y-20 md:py-16">
        <section aria-labelledby="categories-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700">বিষয়ভিত্তিক অনুসন্ধান</p>
              <h2 id="categories-heading" className="mt-2 font-heading text-2xl font-semibold text-emerald-950 sm:text-3xl">আপনার প্রয়োজনের বিষয়টি বেছে নিন</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">সহজে নির্দিষ্ট বিষয়ে মাসআলা ও আলোচনা খুঁজে নিন।</p>
            </div>
            <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">
              সব ক্যাটাগরি <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          {categories.length > 0 ? (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category, index) => {
                const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
                return (
                  <Link key={category.slug} href={`/categories/${category.slug}`} className="group rounded-2xl border border-emerald-950/10 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-lg hover:shadow-emerald-950/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white"><Icon className="h-5 w-5" /></span>
                    <span className="mt-4 block font-heading text-sm font-semibold text-emerald-950">{category.name}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-ink-400">দেখুন <ChevronRight className="h-3.5 w-3.5" /></span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-emerald-950/20 bg-white/70 px-5 py-8 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-emerald-700" />
              <p className="mt-3 font-semibold text-emerald-950">ক্যাটাগরি শিগগিরই যুক্ত হবে</p>
              <p className="mt-1 text-sm text-ink-600">এর মধ্যে সার্চ করে প্রকাশিত মাসআলা খুঁজে নিতে পারেন।</p>
              <Link href="/search" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">মাসআলা খুঁজুন <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          )}
        </section>

        {featured && (
          <section aria-labelledby="featured-heading" className="grid gap-6 overflow-hidden rounded-3xl border border-gold-400/30 bg-gradient-to-br from-[#f7f4e9] to-white p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900"><Sparkles className="h-3.5 w-3.5" /> নির্বাচিত মাসআলা</div>
              <h2 id="featured-heading" className="mt-4 font-heading text-2xl font-semibold leading-snug text-emerald-950 sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-ink-600">{featured.content[0]}</p>
              <Link href={`/masala/${featured.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                বিস্তারিত পড়ুন <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            <div aria-hidden="true" className="hidden h-28 w-28 items-center justify-center rounded-full border border-gold-400/50 bg-white/70 text-emerald-800 md:flex">
              <BookOpen className="h-12 w-12" strokeWidth={1.2} />
            </div>
          </section>
        )}

        <section aria-labelledby="recent-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700">সর্বশেষ প্রকাশনা</p>
              <h2 id="recent-heading" className="mt-2 font-heading text-2xl font-semibold text-emerald-950 sm:text-3xl">নতুন মাসআলা ও আলোচনা</h2>
            </div>
            <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">সব খুঁজুন <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          {recent.length > 0 ? (
            <div className="mt-6 divide-y divide-emerald-950/10 border-y border-emerald-950/10">
              {recent.map((masala) => {
                const category = categories.find((item) => item.slug === masala.categoryId);
                return (
                  <article key={masala.slug} className="group flex items-start justify-between gap-4 py-5 sm:py-6">
                    <div className="min-w-0">
                      {category && <p className="text-xs font-semibold text-emerald-700">{category.name}</p>}
                      <h3 className="mt-1 font-heading text-base font-semibold leading-7 text-emerald-950 transition group-hover:text-emerald-700 sm:text-lg">
                        <Link href={`/masala/${masala.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{masala.title}</Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-ink-600">{masala.content[0]}</p>
                    </div>
                    <Link href={`/masala/${masala.slug}`} aria-label={`${masala.title} পড়ুন`} className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-950/10 text-emerald-800 transition group-hover:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-white"><ChevronRight className="h-4 w-4" /></Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-emerald-950/10 bg-white p-8 text-center">
              <BookMarked className="mx-auto h-8 w-8 text-emerald-700" />
              <p className="mt-3 font-semibold text-emerald-950">নতুন প্রকাশনা প্রস্তুত হচ্ছে</p>
              <p className="mt-1 text-sm text-ink-600">প্রকাশিত মাসআলা যুক্ত হলে এখানে দেখা যাবে।</p>
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-emerald-950 p-6 text-cream-50 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-gold-400"><CircleHelp className="h-5 w-5" /></span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-cream-50">আপনার কোনো মাসআলা জানতে হবে?</h2>
            <p className="mt-2 text-sm leading-7 text-cream-100/70">প্রশ্নটি বিস্তারিত লিখে পাঠান। উপযুক্ত পর্যালোচনার পর উত্তর দেওয়ার ব্যবস্থা থাকবে।</p>
            <Link href="/ask" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-gold-400/90">প্রশ্ন জমা দিন <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><ShieldCheck className="h-5 w-5" /></span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-emerald-950">ফতোয়া পড়ুন দায়িত্বশীলভাবে</h2>
            <p className="mt-2 text-sm leading-7 text-ink-600">প্রশ্নের প্রেক্ষাপট, ব্যবহৃত রেফারেন্স এবং আলেমের পরামর্শ গুরুত্বপূর্ণ। ব্যক্তিগত বা জটিল বিষয়ে সরাসরি যোগ্য মুফতির সঙ্গে যোগাযোগ করুন।</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">আমাদের নীতিমালা জানুন <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
