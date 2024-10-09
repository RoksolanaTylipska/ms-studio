import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Modal, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  InputsContainer,
  ModalContainer,
  TextContainer,
  Description,
} from "./styled";

const ModalWindow = () => {
  const { isOpen, handleModalWindow } = useModalWindowContext();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalWindow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <Image
          src="/assets/photos/modal-window.jpeg"
          alt="MS Studio"
          width={300}
          height={400}
          style={{ borderRadius: "25px" }}
        />
        <TextContainer>
          <Image
            src="/assets/icons/logo-black.png"
            alt="Logo"
            width={85}
            height={85}
            style={{ margin: "auto" }}
          />
          <Typography id="modal-modal-title" variant="h3">
            {t("modalWindow.title")}
          </Typography>
          <Description
            id="modal-modal-description"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            {t("modalWindow.description")}
          </Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputsContainer>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t("modalWindow.input.name_required"),
                  },
                  
                }}
                
                render={({ field }) => (
                  <TextField
                    style={{ paddingBottom: "10px" }}
                    {...field}
                    label={t("modalWindow.input.name")}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name ? String(errors.name.message) : ""}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t("modalWindow.input.phone_required"),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    style={{ paddingBottom: "10px" }}
                    {...field}
                    label={t("modalWindow.input.phone")}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={
                      errors.phone ? String(errors.phone.message) : ""
                    }
                  />
                )}
              />

              <Button
                children={t("button.bookAppointment")}
                color="dark"
                type="primary"
              />
            </InputsContainer>
          </form>

          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            {t("modalWindow.privatePolicy")}
          </Typography>
        </TextContainer>
      </ModalContainer>
    </Modal>
  );
};

export default ModalWindow;
