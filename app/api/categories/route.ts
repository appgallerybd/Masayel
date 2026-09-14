import { getCategories } from "@/lib/firebase/reads";

export async function GET() {
  const categories = await getCategories();
  return Response.json(categories);
}
