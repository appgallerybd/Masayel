import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// এটা শুধু সার্ভার-সাইডে (API route/middleware) ব্যবহার হবে।
// FIREBASE_SERVICE_ACCOUNT_KEY — Firebase কনসোল থেকে ডাউনলোড করা
// service-account JSON, .env.local-এ base64/স্ট্রিং হিসেবে রাখা হবে।

function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
  );

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminApp = getAdminApp();

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
