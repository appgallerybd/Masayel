// ⚠️ এই ফাইলের সব ডেটা নমুনা/মক — শুধু UI দেখানোর জন্য।
// Firestore ইন্টিগ্রেশনের সময় এই ফাইলটার বদলে lib/firebase/firestore.ts
// থেকে আসা রিয়েল ডেটা ব্যবহার হবে, আর এই ফাইলটা মুছে ফেলা হবে।

export interface MockCategory {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface MockMasala {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryLabel: string;
}

export const CATEGORIES: MockCategory[] = [
  { slug: "namaz", name: "নামাজ", description: "নামাজের নিয়ম, ওয়াক্ত ও সংশ্লিষ্ট বিধান", count: 42 },
  { slug: "roja", name: "রোজা", description: "রোজার বিধি-বিধান, ভঙ্গের কারণ, কাফফারা", count: 28 },
  { slug: "zakat", name: "যাকাত", description: "যাকাতের নেসাব, হিসাব ও পাত্র", count: 19 },
  { slug: "hajj", name: "হজ্জ", description: "হজ্জ ও ওমরাহর ধাপ ও বিধান", count: 15 },
  { slug: "poribar", name: "পারিবারিক জীবন", description: "বিবাহ, তালাক, সন্তান প্রতিপালন", count: 33 },
  { slug: "lenden", name: "লেনদেন", description: "ব্যবসা-বাণিজ্য, ঋণ, সুদ সংক্রান্ত মাসআলা", count: 24 },
  { slug: "aqida", name: "আকিদা", description: "ঈমান ও বিশ্বাসগত বিষয়াদি", count: 12 },
  { slug: "jerath", name: "মিরাস (উত্তরাধিকার)", description: "সম্পত্তি বণ্টনের ইসলামি বিধান", count: 9 },
];

export interface MockScholar {
  slug: string;
  name: string;
  designation: string;
  bio: string;
  credentials: string[];
}

export const SCHOLARS: MockScholar[] = [
  {
    slug: "mufti-abdur-rahman",
    name: "মুফতি আব্দুর রহমান",
    designation: "মুফতি ও ফিকহ গবেষক",
    bio: "মুফতি আব্দুর রহমান দীর্ঘ ১৫ বছর ধরে ফিকহ ও ফতোয়া বিষয়ে গবেষণা ও শিক্ষাদান করছেন। তিনি স্থানীয় জামে মসজিদের ইমাম ও খতিব হিসেবেও দায়িত্ব পালন করেন।",
    credentials: ["দাওরায়ে হাদিস, আল-জামিয়া", "ইফতা সম্পন্ন", "১৫+ বছরের ফতোয়া অভিজ্ঞতা"],
  },
  {
    slug: "mawlana-imran-hossain",
    name: "মাওলানা ইমরান হোসাইন",
    designation: "হাদিস বিশেষজ্ঞ",
    bio: "মাওলানা ইমরান হোসাইন হাদিসশাস্ত্রে বিশেষায়িত পড়াশোনা সম্পন্ন করেছেন এবং বর্তমানে একটি মাদরাসায় হাদিস বিভাগের শিক্ষক হিসেবে কর্মরত।",
    credentials: ["তাকমিল ফিল হাদিস", "মাদরাসা শিক্ষক, ১০ বছর"],
  },
];

export interface QuranRef {
  surah: string;
  ayah: string;
  text: string;
}

export interface HadithRef {
  source: string;
  number: string;
  text: string;
}

export interface MockMasalaDetail {
  slug: string;
  title: string;
  categorySlug: string;
  categoryLabel: string;
  fiqhSchool: string;
  scholarSlug: string;
  status: "draft" | "published";
  tags: string[];
  content: string[]; // প্যারাগ্রাফ ধরে ধরে
  quranRefs: QuranRef[];
  hadithRefs: HadithRef[];
}

export const MASALA_DETAILS: Record<string, MockMasalaDetail> = {
  "imam-er-pichone-fatiha": {
    slug: "imam-er-pichone-fatiha",
    title: "নামাজে ইমামের পেছনে সূরা ফাতিহা পড়া প্রসঙ্গে",
    categorySlug: "namaz",
    categoryLabel: "নামাজ",
    fiqhSchool: "হানাফি",
    scholarSlug: "mufti-abdur-rahman",
    status: "published",
    tags: ["নামাজ", "জামাত", "কিরাত"],
    content: [
      "জামাতে নামাজ পড়ার সময় ইমাম সাহেব যখন সরবে (উচ্চস্বরে) কিরাত পড়েন, তখন মুক্তাদির জন্য সূরা ফাতিহা পড়া প্রয়োজন কি না — এ নিয়ে ফিকহবিদদের মাঝে দুটি মত রয়েছে।",
      "হানাফি মাযহাব অনুযায়ী, সরব কিরাতের নামাজে মুক্তাদি চুপ থেকে ইমামের কিরাত মনোযোগ সহকারে শোনেন — তিনি নিজে সূরা ফাতিহা পড়েন না। কেননা ইমামের কিরাতই মুক্তাদির কিরাত হিসেবে গণ্য হয়।",
      "তবে নীরব (সিররি) কিরাতের নামাজে অর্থাৎ যোহর ও আসরের ক্ষেত্রে মুক্তাদির জন্য সূরা ফাতিহা পড়া মুস্তাহাব বলে অনেকে মত দিয়েছেন।",
    ],
    quranRefs: [
      {
        surah: "সূরা আল-আরাফ",
        ayah: "২০৪",
        text: "যখন কুরআন পাঠ করা হয়, তখন তোমরা তা মনোযোগ সহকারে শ্রবণ কর এবং নীরব থাক, যাতে তোমাদের প্রতি রহমত করা হয়।",
      },
    ],
    hadithRefs: [
      {
        source: "সুনানে আবু দাউদ",
        number: "৬০৩",
        text: "যখন ইমাম কিরাত পড়েন, তখন তোমরা চুপ থাকো।",
      },
    ],
  },
  "wudu-batil-howar-karon": {
    slug: "wudu-batil-howar-karon",
    title: "ওযু ভঙ্গের কারণসমূহ কী কী?",
    categorySlug: "namaz",
    categoryLabel: "নামাজ",
    fiqhSchool: "হানাফি",
    scholarSlug: "mufti-abdur-rahman",
    status: "published",
    tags: ["ওযু", "পবিত্রতা"],
    content: [
      "ওযু একটি গুরুত্বপূর্ণ ইবাদত যা নামাজ আদায়ের পূর্বশর্ত। কিছু নির্দিষ্ট কারণে ওযু ভঙ্গ হয়ে যায়, যা জেনে রাখা প্রতিটি মুসলমানের জন্য জরুরি।",
      "পেশাব-পায়খানার রাস্তা দিয়ে যেকোনো কিছু বের হলে, গভীর ঘুমে অচেতন হয়ে পড়লে, শরীরের কোনো স্থান থেকে রক্ত বা পুঁজ প্রবাহিত হলে ওযু ভেঙে যায়।",
    ],
    quranRefs: [
      {
        surah: "সূরা আল-মায়িদা",
        ayah: "৬",
        text: "যখন তোমরা নামাজে দাঁড়াতে চাও, তখন তোমাদের মুখমণ্ডল ও কনুই পর্যন্ত হাত ধৌত কর...",
      },
    ],
    hadithRefs: [
      {
        source: "সহীহ বুখারী",
        number: "১৩৫",
        text: "আল্লাহ তায়ালা অপবিত্র অবস্থায় কারো নামাজ কবুল করেন না, যতক্ষণ না সে ওযু করে।",
      },
    ],
  },
};

export const MASALA_LIST: MockMasala[] = [
  {
    slug: "imam-er-pichone-fatiha",
    title: "নামাজে ইমামের পেছনে সূরা ফাতিহা পড়া প্রসঙ্গে",
    excerpt:
      "জামাতে নামাজ পড়ার সময় ইমামের পেছনে মুক্তাদির সূরা ফাতিহা পড়া নিয়ে ফিকহবিদদের মতামত...",
    categorySlug: "namaz",
    categoryLabel: "নামাজ",
  },
  {
    slug: "wudu-batil-howar-karon",
    title: "ওযু ভঙ্গের কারণসমূহ কী কী?",
    excerpt:
      "ওযু ভঙ্গের প্রধান কারণগুলোর মধ্যে রয়েছে পেশাব-পায়খানার রাস্তা দিয়ে কিছু বের হওয়া, গভীর ঘুম, রক্ত প্রবাহিত হওয়া...",
    categorySlug: "namaz",
    categoryLabel: "নামাজ",
  },
  {
    slug: "roja-obosthay-vul-kore-khawa",
    title: "রোজা অবস্থায় ভুলে খেয়ে ফেললে করণীয় কী?",
    excerpt:
      "ভুলবশত পানাহার করলে রোজা ভঙ্গ হয় না — এই বিধানের বিস্তারিত ব্যাখ্যা ও দলিল...",
    categorySlug: "roja",
    categoryLabel: "রোজা",
  },
  {
    slug: "zakat-kar-upor-farz",
    title: "যাকাত কার উপর ফরজ?",
    excerpt: "নেসাব পরিমাণ সম্পদের মালিক হলে যাকাত ফরজ হয় — নেসাবের হিসাব...",
    categorySlug: "zakat",
    categoryLabel: "যাকাত",
  },
  {
    slug: "hajj-obostha-bodol",
    title: "হজ্জের সময় অসুস্থ হলে করণীয় কী?",
    excerpt: "হজ্জ পালনের সময় অসুস্থতাজনিত কারণে কিছু আহকাম পরিবর্তন হতে পারে...",
    categorySlug: "hajj",
    categoryLabel: "হজ্জ",
  },
  {
    slug: "talaq-kotobar-deya-jai",
    title: "তালাক কতবার দেওয়া যায়?",
    excerpt: "তালাকের সংখ্যা ও এর শরয়ী সীমারেখা সম্পর্কে বিস্তারিত...",
    categorySlug: "poribar",
    categoryLabel: "পারিবারিক জীবন",
  },
];
