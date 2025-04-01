import { InputData } from "@/features/home/components/Feedback/types/inputsData";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export enum FirebaseCollection {
  USERS = "users",
  FEEDBACKS = "feedbacks",
  MASTERS = "masters",
}

export const addFirebaseData = async (
  firebaseCollection: FirebaseCollection,
  data: InputData
): Promise<void> => {
  try {
    await addDoc(collection(db, firebaseCollection), data);
  } catch (error) {
    console.error(`Error adding document to ${firebaseCollection}:`, error);
    throw new Error(`Failed to add data to ${firebaseCollection}`);
  }
};
