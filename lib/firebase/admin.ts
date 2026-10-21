import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

function parseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && parsed.project_id ? parsed : null;
  } catch {
    return null;
  }
}

export function isFirebaseConfigured(): boolean {
  return Boolean(parseServiceAccount());
}

function getAdminApp(): App {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add FIREBASE_SERVICE_ACCOUNT_KEY to enable database operations.");
  }
  if (getApps().length) return getApps()[0];
  return initializeApp({ credential: cert(parseServiceAccount()!) });
}

function lazyService<T extends object>(factory: () => T): T {
  return new Proxy({} as T, {
    get(_target, property) {
      const service = factory() as T & Record<PropertyKey, unknown>;
      const value = service[property];
      return typeof value === "function" ? value.bind(service) : value;
    },
  });
}

// Lazy initialization lets public pages and Vercel Preview render without Firebase.
// Database-dependent actions must check isFirebaseConfigured() and return a clear
// unavailable response rather than pretending that a write succeeded.
export const adminDb = lazyService<Firestore>(() => getFirestore(getAdminApp()));
export const adminAuth = lazyService<Auth>(() => getAuth(getAdminApp()));
