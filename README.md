# মাসায়েল২৪ (Masael24)

বাংলা ভাষাভাষীদের জন্য বিষয়ভিত্তিক ইসলামি মাসআলা, ফতোয়া ও দ্বীনি প্রশ্ন-উত্তরের প্ল্যাটফর্ম।

## প্রযুক্তি
- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS
- Firebase Admin SDK / Cloud Firestore (ঐচ্ছিক; পরবর্তী ধাপে সংযুক্ত হবে)
- Zod validation
- Vercel deployment

## লোকাল ডেভেলপমেন্ট
1. Node.js 20 বা তার পরের LTS সংস্করণ ইনস্টল করুন।
2. রিপোজিটরি ক্লোন করে প্রজেক্ট ফোল্ডারে যান।
3. `.env.local.example` কপি করে `.env.local` তৈরি করুন।
4. Firebase ছাড়াই UI/পাবলিক পেজ পরীক্ষা করতে চাইলে Firebase variables আপাতত ফাঁকা রাখুন।
5. `npm install` চালান।
6. `npm run dev` চালিয়ে `http://localhost:3000` খুলুন।

## Firebase (পরবর্তী ধাপে)
Firebase এখনো সেটআপ করা না থাকলে পাবলিক পেজগুলো খালি ক্যাটাগরি/মাসআলার state দেখাবে। নমুনা বা বানানো ফতোয়া দেখানো হবে না। প্রশ্ন জমা দেওয়া এবং ডেটাবেস-নির্ভর ফিচার Firebase সংযুক্ত না হওয়া পর্যন্ত বন্ধ থাকবে।

পরে Firebase চালু করতে প্রয়োজন হবে:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_KEY`: Firebase service account JSON-এর সম্পূর্ণ কনটেন্ট এক লাইনের JSON string হিসেবে। Base64 নয়, যদি না কোডে আলাদা decoding যোগ করা হয়।

**গোপনীয়তা:** Service-account private key কখনো GitHub-এ commit করবেন না। এটি শুধু local `.env.local` বা Vercel-এর Environment Variables-এ রাখুন।

## Vercel Preview Deployment
1. Vercel-এ GitHub repository `appgallerybd/Masayel` সংযুক্ত রাখুন।
2. `nain` branch-টি Preview branch হিসেবে ব্যবহার করুন, অথবা Vercel Deployments থেকে ওই branch-এর deployment তৈরি করুন।
3. Firebase variables আপাতত প্রয়োজন নেই; Preview-তে UI ও static/public layout যাচাই করুন।
4. Build Command `npm run build` এবং Framework Preset Next.js রাখুন।
5. Deployment Ready হলে Home, About, Contact, navigation, responsive layout এবং search page খোলা যাচ্ছে কি না যাচাই করুন। Firebase-নির্ভর ডেটা/প্রশ্ন জমার ফিচার এখনো live হিসেবে গণ্য করবেন না।

## Firestore (পরে)
- `firestore.rules` এবং `firestore.indexes.json` Firebase চালুর সময় query ও security requirements অনুযায়ী যাচাই করতে হবে।
- Production-এ যাওয়ার আগে Firebase Authentication, Firestore collections, indexes এবং service-account permissions পরীক্ষা করা বাধ্যতামূলক।

## যাচাই
GitHub Actions workflow TypeScript check ও ESLint চালায়। Firebase credentials না থাকলে workflow production build ধাপটি skip করে; সেটিকে successful production build হিসেবে গণ্য করবেন না।

## Editorial trust
ফতোয়ার উৎস, কিতাব/খণ্ড/পৃষ্ঠা, লেখকের পরিচয় এবং পর্যালোচনার তথ্য দায়িত্বপ্রাপ্ত আলেমদের দ্বারা যাচাই করে প্রকাশ করতে হবে। ওয়েবসাইটের সাধারণ লেখা ব্যক্তিগত ফতোয়ার বিকল্প নয়.
