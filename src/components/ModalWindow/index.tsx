import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useSendTelegramMessage } from "@/hooks/useSendTelegramMessage";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { ModalContainer } from "./styled";
import { MessageType } from "@/helpers/getMessages";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import { Appointment, Loader, ThankYou } from '@/components';

const token = process.env.NEXT_PUBLIC_TELEGRAM_APPOINTMENT_token ?? "";
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_APPOINTMENT_chatId ?? "";

export const ModalWindow = () => {
  const { isOpen, handleModalWindow, setIsOpen } = useModalWindowContext();
  const { success, setSuccess, loading, onSubmit } = useSendTelegramMessage({
    chatId,
    token,
    firebaseCollection: FirebaseCollection.USERS,
    messageType: MessageType.APPOINTMENT,
  });

  useEffect(() => {
    if (success) {
      const timer = window.setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Modal
      open={isOpen}
      onClose={handleModalWindow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        {loading ? (
          <Loader />
        ) : (
          <>{!success ? <Appointment onSubmit={onSubmit} /> : <ThankYou />}</>
        )}
      </ModalContainer>
    </Modal>
  );
};
