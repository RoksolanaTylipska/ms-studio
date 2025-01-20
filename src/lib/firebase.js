import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCAS9aehySDCTNlBHNyQjaQK7uPyGGIn0",
  authDomain: "ms-studio-cd515.firebaseapp.com",
  projectId: "ms-studio-cd515",
  storageBucket: "ms-studio-cd515.firebasestorage.app",
  messagingSenderId: "1054605845140",
  appId: "1:1054605845140:web:23639884b07db4125d8a81",
  measurementId: "G-CFR8E1QJBL",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export let analytics;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => console.error("Analytics not supported", err));
}
