import { formatDate } from "@/helpers/formatDate";
import { useState } from "react";
import useAddFirebaseData from "./useAddFirebaseData";

export interface InputData {
  name: string;
  phone: string;
}

interface useSubmitAppointmentProps {
  setSuccess: (value: boolean) => void;
}

export const useSubmitAppointment = ({
  setSuccess,
}: useSubmitAppointmentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addDocument } = useAddFirebaseData();

  const token = "7900221803:AAHemZlkwSXTRDSczzBMLnJcBpvL1OdYOD0";
  const chatId = "-1002392170384"; // -1002392170384 25099289

  const addToFirebase = async (data: InputData) => {
    const date = new Date();
    const formattedDate = formatDate(date);

    await addDocument("users", data);
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
