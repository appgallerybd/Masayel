export interface Question {
  id: string;
  questionText: string;
  categorySlug: string;
  askedByName: string | null;
  askedByEmail: string | null;
  status: "pending" | "answered" | "rejected";
  createdAt: string;
}
