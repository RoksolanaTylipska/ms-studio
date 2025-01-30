import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { InputData, useSubmitAppointment } from "@/hooks/useSubmitAppointment";
import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import Button from "../Button";
import InputName from "../InputName";
import InputPhone from "../InputPhone";
import { Description, InputsContainer, TextContainer } from "./styled";

interface AppointmentProps {
  setSuccess: (value: boolean) => void;
}

const Appointment = ({ setSuccess }: AppointmentProps) => {
  const { handleModalWindow } = useModalWindowContext();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputData>();
  const router = useRouter();
  const { onSubmit, loading } = useSubmitAppointment({ setSuccess });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const goToPrivatePolicy = () => {
    router.push("/privacy-policy");
    handleModalWindow();
  };

  return (
    <>
      {!isMobile ? (
        <Image
          src="/assets/photos/modal-window.webp"
          alt="MS Studio"
          width={300}
          height={400}
          style={{ borderRadius: "15px" }}
        />
      ) : (
        <div style={{ position: "relative", width: "100%", height: "260px" }}>
          <Image
            src="/assets/photos/modal-window-mobile.webp"
            alt="MS Studio"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>

      )}

      <TextContainer>
        <Image
          src="/assets/icons/logo-black.png"
          alt="Logo"
          width={80}
          height={80}
          style={{ margin: "auto" }}
        />


        <Typography
          id="modal-modal-title"
          variant="h4"
          sx={{ textAlign: "center" }}
        >
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
            <InputName control={control} errors={errors} />

            <InputPhone control={control} />

            <Button
              children={t("button.bookAppointment")}
              color="dark"
              type="primary"
            />
          </InputsContainer>
        </form>

        <Typography
          id="modal-modal-description"
          variant="body2"
          sx={{ textAlign: "center" }}
        >
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

export default Appointment;
