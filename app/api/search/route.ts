import { NextRequest } from "next/server";
import { getPublishedMasala } from "@/lib/firebase/reads";

const MAX_QUERY_LENGTH = 80;
const MAX_RESULTS = 50;

function normalize(text: string) {
  return text.toLocaleLowerCase("bn-BD").trim().replace(/\s+/g, " ");
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) return Response.json([]);
  if (q.length > MAX_QUERY_LENGTH) {
    return Response.json({ error: `সার্চ সর্বোচ্চ ${MAX_QUERY_LENGTH} অক্ষরের হতে পারবে` }, { status: 400 });
  }

  // বর্তমান Firestore মডেলে server-side filtering-এর সুবিধা নেই।
  // তাই আপাতত bounded read রাখা হয়েছে; বড় ডেটাসেট হলে Typesense/Algolia-তে
  // index-based search চালু করা উচিত।
  const allMasala = await getPublishedMasala(200);
  const normalizedQuery = normalize(q);

  const results = allMasala
    .filter((masala) => {
      const haystack = normalize(`${masala.title} ${masala.content.join(" ")} ${masala.tags.join(" ")}`);
      return haystack.includes(normalizedQuery);
    })
    .slice(0, MAX_RESULTS);

  return Response.json(results, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
