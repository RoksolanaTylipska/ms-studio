import { fetchGoogleReviews, googleReviewsConfigured } from "@/lib/googleReviews";
import type { NextApiRequest, NextApiResponse } from "next";

// Vercel's CDN answers for a day, so visitors never reach Google themselves
// and server restarts don't add billed requests
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const data = await fetchGoogleReviews();
  if (data) {
    // After a day the CDN keeps serving this answer while it asks for a fresh one
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).json(data);
  }
  if (!googleReviewsConfigured()) {
    res.setHeader("Cache-Control", "public, s-maxage=3600");
    return res.status(200).json(null);
  }
  // Google failed (e.g. the daily limit): an error is never cached, so the CDN
  // keeps the last good answer instead of an empty block
  res.setHeader("Cache-Control", "no-store");
  return res.status(503).json(null);
}
