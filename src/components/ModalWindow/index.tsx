import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useSubmitAppointment } from "@/hooks/useSubmitAppointment";
import { Modal } from "@mui/material";
import Appointment from "../Appointment";
import Loader from "../Loader";
import ThankYou from "../ThankYou";
import { ModalContainer } from "./styled";
import { useState } from "react";

const ModalWindow = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { isOpen, handleModalWindow } = useModalWindowContext();
  const { loading } = useSubmitAppointment({ setSuccess });

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
          <>{!success ? <Appointment setSuccess={setSuccess} /> : <ThankYou />}</>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default ModalWindow;
