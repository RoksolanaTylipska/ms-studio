import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useSubmitAppointment } from "@/hooks/useSubmitAppointment";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Appointment from "../Appointment";
import Loader from "../Loader";
import ThankYou from "../ThankYou";
import { ModalContainer } from "./styled";

const ModalWindow = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { isOpen, handleModalWindow, setIsOpen } = useModalWindowContext();
  const { loading } = useSubmitAppointment({ setSuccess });

  useEffect(() => {
    if (success) {
      const timer = window.setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
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
          <>
            {!success ? <Appointment setSuccess={setSuccess} /> : <ThankYou />}
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default ModalWindow;
