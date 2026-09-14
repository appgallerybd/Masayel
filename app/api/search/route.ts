import { NextRequest } from "next/server";
import { getPublishedMasala } from "@/lib/firebase/reads";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) return Response.json([]);

  // ⚠️ এখন সব প্রকাশিত মাসআলা এনে JS দিয়ে ফিল্টার করা হচ্ছে — ডেটা বাড়লে
  // এটা স্কেল করবে না। তখন Algolia/Typesense-এর মতো সার্ভিস লাগবে।
  const allMasala = await getPublishedMasala(200);
  const normalizedQuery = normalize(q);

  const results = allMasala.filter((masala) => {
    const haystack = normalize(`${masala.title} ${masala.content.join(" ")} ${masala.tags.join(" ")}`);
    return haystack.includes(normalizedQuery);
  });

  return Response.json(results);
}
