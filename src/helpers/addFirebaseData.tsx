import { FirebaseCollection } from "@/constants/firebase";
import { InputData } from "@/features/home/components/Feedback/types/inputsData";

export { FirebaseCollection };

export const addFirebaseData = async (
  firebaseCollection: FirebaseCollection,
  data: InputData
): Promise<void> => {
  try {
    // Firebase is loaded on demand to keep it out of the initial bundle
    const [{ db }, { addDoc, collection }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/firestore"),
    ]);
    await addDoc(collection(db, firebaseCollection), data);
  } catch (error) {
    console.error(`Error adding document to ${firebaseCollection}:`, error);
    throw new Error(`Failed to add data to ${firebaseCollection}`);
  }
};
