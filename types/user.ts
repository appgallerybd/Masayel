export type UserRole = "superadmin" | "admin" | "moderator" | "scholar" | "user";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  bookmarks: string[]; // masala id গুলো
}
