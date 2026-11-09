import { fetchGoogleReviews } from "@/lib/googleReviews";
import type { NextApiRequest, NextApiResponse } from "next";

// Vercel's CDN answers for a day, so visitors never reach Google themselves
// and server restarts don't add billed requests
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const data = await fetchGoogleReviews();
  // A failure is cached too: retrying on every visit is what would cost money
  res.setHeader("Cache-Control", `public, s-maxage=${data ? 86400 : 3600}`);
  res.status(200).json(data);
}
