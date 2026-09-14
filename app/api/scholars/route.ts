import { getScholars } from "@/lib/firebase/reads";

export async function GET() {
  const scholars = await getScholars();
  return Response.json(scholars);
}
