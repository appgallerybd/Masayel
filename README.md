# মাসআলা শেয়ারিং

ইসলামিক মাসআলা (ফিকহ) শেয়ারিং ও Q&A প্ল্যাটফর্ম। Next.js (App Router) + Firebase (Firestore + Auth)।

## স্থাপত্য

- **কোনো ক্লায়েন্ট-সাইড Firestore অ্যাক্সেস নেই** — সব রিড/রাইট Next.js সার্ভারের মধ্য দিয়ে (`firebase-admin`) হয়, হয় সরাসরি Server Component থেকে (পাবলিক পেজ) অথবা API Route থেকে (ফর্ম/অ্যাডমিন)। তাই `firestore.rules` সম্পূর্ণ বন্ধ (`deny all`) রাখা নিরাপদ।
- **লগইন** — Firebase Auth (ইমেইল/পাসওয়ার্ড) দিয়ে ক্লায়েন্টে সাইন-ইন, তারপর `/api/session` এ ID টোকেন পাঠিয়ে একটা নিরাপদ httpOnly সেশন কুকি বসানো হয় (`firebase-admin`-এর `createSessionCookie`)।
- **রোল যাচাই** — `app/(admin)/admin/(protected)/layout.tsx` (Server Component) প্রতিটা অ্যাডমিন পেজ লোডে সেশন কুকি যাচাই করে Firestore থেকে রোল বের করে; `middleware.ts` শুধু দ্রুত Edge-সাইড প্রাথমিক চেক (কুকি আছে কিনা)।

## প্রথমবার সেটআপ

```bash
npm install
cp .env.local.example .env.local
# .env.local এ Firebase কনসোল থেকে সব কী বসাও (client config + service account key)
npm run seed   # প্রাথমিক ক্যাটাগরি/স্কলার/নমুনা মাসআলা দিয়ে Firestore ভরে দেয়
npm run dev
```

তারপর http://localhost:3000 (পাবলিক সাইট) এবং http://localhost:3000/admin/login (অ্যাডমিন)।

**প্রথম অ্যাডমিন অ্যাকাউন্ট বানানো:** Firebase Console → Authentication থেকে ম্যানুয়ালি একটা ইউজার বানাও (ইমেইল/পাসওয়ার্ড), তারপর Firestore Console-এ গিয়ে `users/{সেই uid}` ডকুমেন্টে `role` ফিল্ড `"superadmin"` করে দাও (প্রথমবার সাইন-ইন করলে ডকুমেন্টটা ডিফল্ট রোল `"user"` দিয়ে অটো তৈরি হয়ে যাবে — সাইন-ইন করার পর রোলটা বদলে দাও)।

## Firestore ইনডেক্স

ক্যাটাগরি/স্কলার অনুযায়ী মাসআলা ফিল্টার করার কুয়েরিগুলোর জন্য কম্পোজিট ইনডেক্স লাগবে। `firestore.indexes.json` এ সংজ্ঞায়িত করা আছে — Firebase CLI থাকলে:

```bash
firebase deploy --only firestore:indexes,firestore:rules
```

CLI না থাকলে, ডেভেলপমেন্টে প্রথমবার ওই কুয়েরি চালালে Firestore একটা এরর মেসেজে সরাসরি একটা লিংক দেবে — সেই লিংকে ক্লিক করলেই ইনডেক্স অটো তৈরি হয়ে যাবে।

## Vercel-এ ডিপ্লয়

1. GitHub রিপো Vercel-এ ইম্পোর্ট করো
2. Project Settings → Environment Variables এ `.env.local` এর সব ভ্যারিয়েবল বসাও (`FIREBASE_SERVICE_ACCOUNT_KEY` সহ — পুরো JSON এক লাইনে)
3. ডিপ্লয় করো

## যা এখনো বাকি আছে (production-এ যাওয়ার আগে)

- **রিয়েল ফুল-টেক্সট সার্চ** — এখন `/api/search` প্রতিবার সব প্রকাশিত মাসআলা এনে JS দিয়ে ফিল্টার করে (২০০টা পর্যন্ত)। ডেটা বাড়লে Algolia বা Typesense-এর মতো সার্ভিস লাগবে।
- **অ্যাডমিন ক্যাটাগরি/স্কলার ম্যানেজমেন্ট UI** — সাইডবারে লিংক আছে কিন্তু এখনো পেজ তৈরি হয়নি; আপাতত Firestore Console থেকে সরাসরি এডিট করতে হবে, অথবা `npm run seed` স্ক্রিপ্ট এডিট করে আবার চালাতে হবে।
- **রিচ-টেক্সট এডিটর** — মাসআলার বিবরণ এখন প্লেইন টেক্সটএরিয়া (প্যারাগ্রাফ ফাঁকা লাইন দিয়ে আলাদা)।
- **ভিউ কাউন্ট** — `views` ফিল্ড আছে কিন্তু এখনো বাড়ানো হচ্ছে না।
