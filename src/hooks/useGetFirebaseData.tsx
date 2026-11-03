import { useEffect, useState } from "react";
import { FirebaseCollection } from "@/constants/firebase";

const useGetFirebaseData = <T = unknown>(collectionName: FirebaseCollection) => {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Firebase is loaded on demand to keep it out of the initial bundle
        const [{ db }, { collection, getDocs, query }] = await Promise.all([
          import("@/lib/firebase"),
          import("firebase/firestore"),
        ]);
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        setData(documents);
      } catch (err) {
        setError("Failed to fetch data from Firestore.");
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};

export default useGetFirebaseData;
