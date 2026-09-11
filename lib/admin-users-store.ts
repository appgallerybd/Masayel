import { AppUser, UserRole } from "@/types/user";

// ⚠️ Firestore এখনো ওয়্যার করা হয়নি — রোল ম্যানেজমেন্ট এখন localStorage-এ।
// Firestore যুক্ত হলে এই ফাংশনগুলো "users" কালেকশনের CRUD দিয়ে প্রতিস্থাপিত হবে।
// বাস্তবে ইউজার প্রথমবার Firebase Auth দিয়ে সাইন-ইন করলে তার uid দিয়ে
// একটা users ডকুমেন্ট তৈরি হবে (ডিফল্ট রোল "user") — এখানে যে রোল অ্যাসাইন করা হচ্ছে
// সেটা সেই ডকুমেন্টের role ফিল্ড আপডেট করার প্রতিনিধিত্ব করছে।

const STORAGE_KEY = "admin:users";

const SEED_USERS: AppUser[] = [
  {
    uid: "seed-1",
    name: "সুপার অ্যাডমিন",
    email: "superadmin@example.com",
    role: "superadmin",
    bookmarks: [],
  },
  {
    uid: "seed-2",
    name: "মুফতি আব্দুর রহমান",
    email: "mufti.rahman@example.com",
    role: "scholar",
    bookmarks: [],
  },
  {
    uid: "seed-3",
    name: "সাধারণ মডারেটর",
    email: "moderator@example.com",
    role: "moderator",
    bookmarks: [],
  },
];

function readStore(): AppUser[] {
  if (typeof window === "undefined") return SEED_USERS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function writeStore(users: AppUser[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getAllUsers(): AppUser[] {
  return readStore();
}

export function getUserByEmail(email: string): AppUser | undefined {
  return readStore().find((u) => u.email === email);
}

export function updateUserRole(uid: string, role: UserRole) {
  const users = readStore().map((u) => (u.uid === uid ? { ...u, role } : u));
  writeStore(users);
}

export function addUser(user: Omit<AppUser, "uid" | "bookmarks">) {
  const users = readStore();
  users.push({ ...user, uid: `manual-${Date.now()}`, bookmarks: [] });
  writeStore(users);
}

export function removeUser(uid: string) {
  writeStore(readStore().filter((u) => u.uid !== uid));
}
