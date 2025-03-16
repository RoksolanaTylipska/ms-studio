import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useAddFirebaseData = () => {
  const addDocument = async (collectionName: string, data: any) => {
    try {
      await addDoc(collection(db, collectionName), data);
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw new Error(`Failed to add data to ${collectionName}`);
    }
  };

  return { addDocument };
};

export default useAddFirebaseData;
