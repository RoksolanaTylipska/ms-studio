import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { formatDate } from "@/helpers/formatDate";

export interface InputData {
  name: string;
  phone: string;
}

interface useSubmitAppointmentProps {
  setSuccess: (value: boolean) => void;
}

export const useSubmitAppointment = ({ setSuccess }: useSubmitAppointmentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  const token = "7900221803:AAHemZlkwSXTRDSczzBMLnJcBpvL1OdYOD0";
  const chatId = "25099289";

  const addToFirebase = async (data: InputData) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    try {
      await addDoc(collection(db, "users"), {
        name: data.name, 
        phone: data.phone,
        date: formattedDate,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to add data to Firebase."); 
    }
  };

  const onSubmit = async (data: InputData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const message = `Нова заявка на запис: 
    Ім'я: ${data.name}  
    Телефон: ${data.phone}`;

    try {
      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
          message
        )}`
      );

      await addToFirebase(data);

      setSuccess(true);
    } catch (err) {
      console.error("Error submitting appointment:", err);
      setError("Failed to submit appointment. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, error }; 
};
