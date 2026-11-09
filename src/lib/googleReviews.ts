// Rating and latest reviews of the studio on Google Maps (Places API, New).
// Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment; without
// them (or if Google fails) the site simply shows its own reviews only.

export type GoogleReview = {
  author: string;
  // The review itself on Google Maps
  url: string | null;
  authorUrl: string | null;
  photo: string | null;
  rating: number;
  text: string;
  publishTime: string;
};

export type GoogleReviews = {
  rating: number;
  count: number;
  url: string | null;
  // Opens Google's "write a review" form for the studio
  writeUrl: string | null;
  reviews: GoogleReview[];
};

// Each Places request is billed. Only /api/google-reviews may call this, behind
// the CDN cache; this one covers a warm server instance
const CACHE_TTL = 24 * 60 * 60 * 1000;
let cache: { at: number; data: GoogleReviews | null } | null = null;

// Google's own "write a review" form for the place (asks to sign in first)
const writeReviewUrl = (placeId: string) =>
  `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;

// Sample answer to see the block locally before the key exists; never used in production
const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString();
const SAMPLE: GoogleReviews = {
  rating: 4.9,
  count: 48,
  url: "https://www.google.com/maps",
  writeUrl: null,
  reviews: [
    { author: "Приклад Олена", url: null, authorUrl: null, photo: null, rating: 5, publishTime: daysAgo(3), text: "Зразок відгуку для перевірки вигляду блоку. Тут буде текст справжнього відгуку з Google." },
    { author: "Приклад Марта", url: null, authorUrl: null, photo: null, rating: 5, publishTime: daysAgo(12), text: "Ще один зразок, трохи довший, щоб побачити, як переноситься текст на кілька рядків у картці відгуку на телефоні та комп'ютері." },
    { author: "Приклад Ірина", url: null, authorUrl: null, photo: null, rating: 4, publishTime: daysAgo(40), text: "Короткий зразок." },
  ],
};

export const fetchGoogleReviews = async (): Promise<GoogleReviews | null> => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key && process.env.NODE_ENV === "development") return { ...SAMPLE, writeUrl: placeId ? writeReviewUrl(placeId) : null };
  if (!key || !placeId) return null;

  if (cache && Date.now() - cache.at < CACHE_TTL) return cache.data;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=uk`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Places API responded ${res.status}`);

    const place = await res.json();
    const data: GoogleReviews = {
      rating: place.rating ?? 0,
      count: place.userRatingCount ?? 0,
      url: place.googleMapsUri ?? null,
      writeUrl: writeReviewUrl(placeId),
      reviews: (place.reviews ?? [])
        // Shown as written, not machine-translated by Google
        .map((review: any) => ({
          author: review.authorAttribution?.displayName ?? "Google",
          url: review.googleMapsUri ?? null,
          authorUrl: review.authorAttribution?.uri ?? null,
          photo: review.authorAttribution?.photoUri ?? null,
          rating: review.rating ?? 0,
          text: (review.originalText ?? review.text)?.text ?? "",
          publishTime: review.publishTime ?? "",
        }))
        .filter((review: GoogleReview) => review.text && review.publishTime),
    };
    cache = { at: Date.now(), data };
    return data;
  } catch (error) {
    console.error("Failed to load Google reviews:", error);
    // Keep showing the last good answer rather than nothing
    return cache?.data ?? null;
  }
};
