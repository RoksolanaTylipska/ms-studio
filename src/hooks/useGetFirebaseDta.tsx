import { collection, getDocs, query, Firestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

const useGetFirebaseDta = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (err) {
        setError("Failed to fetch data from Firestore.");
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [db, collectionName]);

  return { data, loading, error };
};

export default useGetFirebaseDta;
