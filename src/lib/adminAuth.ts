import type { NextApiRequest } from "next";

const PROJECT_ID = "ms-studio-cd515";

// Checks that an API request comes from someone with access to /admin.
// The browser sends its Firebase ID token; Firestore itself validates the
// token and only lets a signed-in user read their own `admins/{email}` entry
// (see the rules in docs/admin-prices.md), so a successful read proves both
// the identity and the access. Returns the admin's email or null.
export const verifyAdmin = async (req: NextApiRequest): Promise<string | null> => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return null;

  let email: string | undefined;
  try {
    // Only used to know which document to ask for; Firestore does the checking
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
    email = payload.email?.toLowerCase();
  } catch {
    return null;
  }
  if (!email) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/admins/${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const doc = await res.json();
    const role = doc?.fields?.role?.stringValue;
    return role === "owner" || role === "editor" ? email : null;
  } catch {
    return null;
  }
};
