import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// .env.local থেকে আসবে — কখনো হার্ডকোড করবে না বা গিটে পুশ করবে না
const firebaseConfig = {
  apiKey: "AIzaSyD7-LZhaluIxH6KB9tif67oMpqZx49IqgI",
  authDomain: "masayel-d0781.firebaseapp.com",
  projectId: "masayel-d0781",
  storageBucket: "masayel-d0781.firebasestorage.app",
  messagingSenderId: "1060573817228",
  appId: "1:1060573817228:web:daa85ab0cb2d7013720ea9"
};

// Next.js hot-reload-এ বারবার initializeApp() যাতে না হয়
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
