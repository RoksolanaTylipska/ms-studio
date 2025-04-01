import { AppointmentData } from "@/features/home/components/Feedback/types/inputsData";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  CloseImage,
  Description,
  ImageContainerMobile,
  InputsContainer,
  TextContainer,
} from "./styled";
import { Button, InputField, InputPhone } from "@/components";

export const Appointment = ({
  onSubmit,
}: {
  onSubmit: (data: AppointmentData) => Promise<void>;
}) => {
  const { handleModalWindow } = useModalWindowContext();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentData>();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const goToPrivatePolicy = () => {
    router.push("/privacy-policy");
    handleModalWindow();
  };

  return (
    <>
      <CloseImage>
        <CloseIcon onClick={handleModalWindow} />
      </CloseImage>

      {!isMobile ? (
        <Image
          src="/assets/photos/modal-window.webp"
          alt="MS Laser"
          width={300}
          height={400}
          style={{ borderRadius: "15px" }}
        />
      ) : (
        <ImageContainerMobile>
          <Image
            src="/assets/photos/modal-window-mobile.webp"
            alt="MS Laser"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </ImageContainerMobile>
      )}

      <TextContainer>
        {!isMobile && (
          <Image
            src="/assets/icons/logo-black.png"
            alt="Logo"
            width={80}
            height={80}
            style={{ margin: "auto" }}
          />
        )}

        <Typography id="modal-modal-title" variant="h4">
          {t("modalWindow.title")}
        </Typography>
        <Description id="modal-modal-description" variant="body1">
          {t("modalWindow.description")}
        </Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputsContainer>
            <InputField
              name="name"
              rules={{ required: t("feedback.form.name") }}
              label={t("feedback.form.name_label")}
              control={control}
              errors={errors}
            />
            <InputPhone
              control={control}
              name="phone"
              label={t("modalWindow.input.phone_label")}
            />
            <Button
              children={t("button.bookAppointment")}
              color="dark"
              type="primary"
            />
          </InputsContainer>
        </form>

        <Typography id="modal-modal-description" variant="body2">
          <Trans
            i18nKey="modalWindow.privatePolicy"
            components={{
              a: (
                <span
                  onClick={goToPrivatePolicy}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                />
              ),
            }}
          />
        </Typography>
      </TextContainer>
    </>
  );
};
