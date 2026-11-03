import { PriceSettings, emptyPriceSettings, normalizePriceSettings } from "@/features/prices/catalog";

export const PRICES_DOC = { collection: "settings", id: "prices" } as const;

const PROJECT_ID = "ms-studio-cd515";
const API_KEY = "AIzaSyCCAS9aehySDCTNlBHNyQjaQK7uPyGGIn0";

// Server-side read through the Firestore REST API: no SDK connection to keep
// open during build/ISR, and a hard timeout so a Firestore outage can't block
// page generation (the site then falls back to the defaults from the code).
export const fetchPriceSettings = async (): Promise<PriceSettings> => {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${PRICES_DOC.collection}/${PRICES_DOC.id}?key=${API_KEY}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.status === 404) return emptyPriceSettings();
    if (!res.ok) throw new Error(`Firestore responded ${res.status}`);

    const doc = await res.json();
    const raw = doc?.fields?.data?.stringValue;
    return raw ? normalizePriceSettings(JSON.parse(raw)) : emptyPriceSettings();
  } catch (error) {
    console.error("Failed to load price settings, using defaults:", error);
    return emptyPriceSettings();
  }
};
