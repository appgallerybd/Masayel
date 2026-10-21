# মাসায়েল২৪ (Masael24)

বাংলা ভাষাভাষীদের জন্য বিষয়ভিত্তিক ইসলামি মাসআলা, ফতোয়া ও দ্বীনি প্রশ্ন-উত্তরের প্ল্যাটফর্ম।

## প্রযুক্তি
- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS
- Firebase Admin SDK / Cloud Firestore
- Zod validation
- Vercel deployment

## লোকাল ডেভেলপমেন্ট
1. Node.js 20 বা তার পরের LTS সংস্করণ ইনস্টল করুন।
2. রিপোজিটরি ক্লোন করে প্রজেক্ট ফোল্ডারে যান।
3. `.env.local.example` কপি করে `.env.local` তৈরি করুন।
4. Firebase Web App config এবং সার্ভার-সাইড service account JSON যোগ করুন।
5. `npm install` চালান।
6. `npm run dev` চালিয়ে `http://localhost:3000` খুলুন।

## প্রয়োজনীয় Environment Variables

### Firebase Web App config
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### সার্ভার-সাইড credential
- `FIREBASE_SERVICE_ACCOUNT_KEY`: Firebase service account JSON-এর সম্পূর্ণ কনটেন্ট এক লাইনের JSON string হিসেবে দিন। Base64 দেবেন না, যদি না কোডে আলাদা decoding যোগ করা হয়।

### SEO / Preview URL
- `NEXT_PUBLIC_SITE_URL`: Vercel preview-এর URL অথবা production domain, trailing slash ছাড়া। Preview-এ সেট করলে canonical metadata ও sitemap সেই URL ব্যবহার করবে।

**গোপনীয়তা:** Service-account private key কখনো GitHub-এ commit করবেন না। এটি শুধু local `.env.local` বা Vercel-এর Environment Variables-এ রাখুন। Public Firebase web config private key নয়, তবে Firebase Security Rules এবং Authentication সঠিকভাবে configure করা বাধ্যতামূলক।

## Vercel Preview Deployment
1. Vercel-এ GitHub account সংযুক্ত করুন।
2. `appgallerybd/Masayel` repository import করুন।
3. Production branch হিসেবে `main` রাখুন; preview branch হিসেবে `upgrade/masael24-premium-v1` ব্যবহার করুন।
4. Vercel Project Settings → Environment Variables-এ উপরের Firebase variables যোগ করুন। প্রথমে Preview environment-এ যোগ করাই ভালো।
5. `NEXT_PUBLIC_SITE_URL`-এ সংশ্লিষ্ট Vercel preview URL সেট করুন। নতুন deployment তৈরি হওয়ার পরে URL বদলালে আবার redeploy করুন।
6. Build Command `npm run build` এবং Framework Preset Next.js রাখুন।
7. Deployment Ready হলে Home, Search, Category, Masala detail, Ask form এবং Admin login আলাদাভাবে পরীক্ষা করুন।

## Firestore
- `firestore.rules`-এ ক্লায়েন্টের direct read/write বন্ধ; সার্ভার Firebase Admin SDK ব্যবহার করে।
- `firestore.indexes.json`-এর composite index প্রয়োজনীয় query-এর সঙ্গে মিলিয়ে Firebase-এ deploy করতে হবে।
- Production-এ deploy করার আগে Firebase Authentication, Firestore collections, index status এবং service-account permission যাচাই করুন।

## যাচাই
GitHub Actions workflow TypeScript check ও ESLint চালায়। Firebase service-account secret configure থাকলে production build-ও চালানোর চেষ্টা করে। Firebase credentials না থাকলে build ধাপটি স্পষ্টভাবে skip করা হয়; সেটিকে successful production build হিসেবে গণ্য করবেন না।

## Editorial trust
ফতোয়ার উৎস, কিতাব/খণ্ড/পৃষ্ঠা, লেখকের পরিচয় এবং পর্যালোচনার তথ্য দায়িত্বপ্রাপ্ত আলেমদের দ্বারা যাচাই করে প্রকাশ করতে হবে। ওয়েবসাইটের সাধারণ লেখা ব্যক্তিগত ফতোয়ার বিকল্প নয়।
