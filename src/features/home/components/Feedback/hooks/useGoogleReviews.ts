import type { GoogleReviews } from "@/lib/googleReviews";
import { useEffect, useState } from "react";

// Rating and latest reviews from Google, served from the CDN-cached API route
export const useGoogleReviews = () => {
  const [googleReviews, setGoogleReviews] = useState<GoogleReviews | null>(null);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then(setGoogleReviews)
      .catch(() => {});
  }, []);

  return googleReviews;
};
