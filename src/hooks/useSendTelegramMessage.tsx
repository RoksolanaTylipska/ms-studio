import { InputData } from "@/features/home/components/Feedback/types/inputsData";
import { MessageType, getMessage } from "@/helpers/getMessages";
import { useState } from "react";
import {
  FirebaseCollection,
  addFirebaseData,
} from "../helpers/addFirebaseData";

interface useSendTelegramMessageProps {
  token?: string;
  chatId?: string;
  firebaseCollection?: FirebaseCollection;
  messageType?: MessageType;
}

export const useSendTelegramMessage = ({
  token,
  chatId,
  firebaseCollection = FirebaseCollection.USERS,
  messageType = MessageType.APPOINTMENT,
}: useSendTelegramMessageProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addToFirebase = async (data: InputData) => {
    await addFirebaseData(firebaseCollection, {
      ...data,
      date: new Date().toISOString(),
    });
  };

  const onSubmit = async (data: InputData) => {

    const message = getMessage(data, messageType);

    try {
      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
          message
        )}`
      );

      await addToFirebase(data);

      setSuccess(true);
    } catch (err) {
      console.error("Error sent message:", err);
      setError("Failed to sent message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, error, success, setSuccess };
};
