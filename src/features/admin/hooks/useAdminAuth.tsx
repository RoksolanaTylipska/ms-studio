import { app, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export type AdminRole = "owner" | "editor";

type AuthState =
  | { status: "loading" }
  | { status: "signedOut" }
  | { status: "noAccess"; user: User }
  | { status: "ready"; user: User; email: string; role: AdminRole };

const auth = getAuth(app);

export const useAdminAuth = () => {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (!user?.email) {
          setState({ status: "signedOut" });
          return;
        }

        const email = user.email.toLowerCase();
        try {
          // Access is granted only to emails listed in the `admins` collection
          const snap = await getDoc(doc(db, "admins", email));
          const role = snap.data()?.role as AdminRole | undefined;
          setState(
            role === "owner" || role === "editor"
              ? { status: "ready", user, email, role }
              : { status: "noAccess", user }
          );
        } catch {
          setState({ status: "noAccess", user });
        }
      }),
    []
  );

  const signIn = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logOut = () => signOut(auth);

  return { state, signIn, logOut };
};
