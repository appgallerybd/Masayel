/**
 * প্রথমবার Firestore সেটআপের পর চালানোর জন্য — ক্যাটাগরি, স্কলার, আর
 * কয়েকটা নমুনা মাসআলা দিয়ে ডেটাবেজ শুরু করে দেয়।
 *
 * চালানোর আগে .env.local এ FIREBASE_SERVICE_ACCOUNT_KEY বসাতে হবে।
 * চালানোর কমান্ড: npm run seed
 *
 * এটা শুধু একবার চালানোর জন্য — বারবার চালালে বিদ্যমান ডকুমেন্টগুলো
 * ওভাররাইট হয়ে যাবে (id/slug একই থাকলে), নতুন করে ডুপ্লিকেট হবে না।
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}");

if (!serviceAccount.project_id) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT_KEY .env.local এ পাওয়া যায়নি বা সঠিক না।");
  process.exit(1);
}

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

const CATEGORIES = [
  { slug: "namaz", name: "নামাজ", order: 1 },
  { slug: "roja", name: "রোজা", order: 2 },
  { slug: "zakat", name: "যাকাত", order: 3 },
  { slug: "hajj", name: "হজ্জ", order: 4 },
  { slug: "poribar", name: "পারিবারিক জীবন", order: 5 },
  { slug: "lenden", name: "লেনদেন", order: 6 },
];

const SCHOLARS = [
  {
    slug: "mufti-abdur-rahman",
    name: "মুফতি আব্দুর রহমান",
    designation: "মুফতি ও ফিকহ গবেষক",
    bio: "মুফতি আব্দুর রহমান দীর্ঘ ১৫ বছর ধরে ফিকহ ও ফাতাওয়া বিষয়ে গবেষণা করে আসছেন।",
    credentials: "দাওরায়ে হাদিস, ইফতা বিভাগ, ১৫+ বছরের ফাতাওয়া অভিজ্ঞতা",
  },
];

const MASALA = [
  {
    slug: "wudu-batil-howar-karon",
    title: "ওযু ভঙ্গের কারণসমূহ কী কী?",
    categoryId: "namaz",
    fiqhSchool: "হানাফি",
    scholarId: "mufti-abdur-rahman",
    status: "published" as const,
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
  {
    slug: "imam-er-pichone-fatiha",
    title: "নামাজে ইমামের পেছনে সূরা ফাতিহা পড়া প্রসঙ্গে",
    categoryId: "namaz",
    fiqhSchool: "হানাফি",
    scholarId: "mufti-abdur-rahman",
    status: "published" as const,
    tags: ["নামাজ", "জামাত", "কিরাত"],
    content: [
      "জামাতে নামাজ পড়ার সময় ইমাম সাহেব যখন সরবে (উচ্চস্বরে) কিরাত পড়েন, তখন মুক্তাদির জন্য সূরা ফাতিহা পড়া প্রয়োজন কি না — এ নিয়ে ফিকহবিদদের মাঝে দুটি মত রয়েছে।",
      "হানাফি মাযহাব অনুযায়ী, সরব কিরাতের নামাজে মুক্তাদি চুপ থেকে ইমামের কিরাত মনোযোগ সহকারে শোনেন — তিনি নিজে সূরা ফাতিহা পড়েন না।",
    ],
    quranRefs: [
      {
        surah: "সূরা আল-আরাফ",
        ayah: "২০৪",
        text: "যখন কুরআন পাঠ করা হয়, তখন তোমরা তা মনোযোগ সহকারে শ্রবণ কর এবং নীরব থাক।",
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
];

async function seed() {
  console.log("ক্যাটাগরি যোগ হচ্ছে...");
  for (const category of CATEGORIES) {
    await db.collection("categories").doc(category.slug).set(category);
  }

  console.log("স্কলার যোগ হচ্ছে...");
  for (const scholar of SCHOLARS) {
    await db.collection("scholars").doc(scholar.slug).set(scholar);
  }

  console.log("নমুনা মাসআলা যোগ হচ্ছে...");
  const now = new Date().toISOString();
  for (const masala of MASALA) {
    await db
      .collection("masala")
      .doc(masala.slug)
      .set({ ...masala, id: masala.slug, views: 0, createdAt: now, updatedAt: now });
  }

  console.log("✅ সিড সম্পন্ন হয়েছে।");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ সিড ব্যর্থ হয়েছে:", err);
  process.exit(1);
});
