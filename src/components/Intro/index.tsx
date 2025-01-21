"use client";

import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  CreateBeautyText,
  Description,
  ImageContainer,
  IntroContainer,
  ServicesContainer,
  TextContainer,
  Title,
} from "../Intro/styled";

function Intro() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  return (
    <ServicesContainer>
      <IntroContainer>
        <ImageContainer>
          <Image
            alt="team photo"
            src={"/assets/photos/services_intro.webp"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </ImageContainer>
        <TextContainer>
          <Image
            src="/assets/icons/logo-black.png"
            alt="Logo"
            width={85}
            height={85}
          />
          <Title variant="h2">{t("services.intro.title")}</Title>
          <Description variant="body1">
            {t("services.intro.subtitle")}
          </Description>
          <Button
            children={t("button.bookAppointment")}
            onClick={handleModalWindow}
            type="primary"
            color="dark"
            size="medium"
          />

          <Box sx={{ rotate: "-10deg", marginTop: "20px" }}>
            <CreateBeautyText variant="bodyCaveat">
              {t("services.intro.create_beauty")}
            </CreateBeautyText>

            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.96361 7.33738C6.39106 6.28292 4.0493 3.7815 2.69501 4.19688C0.953131 4.73114 0.904683 9.8089 1.95679 10.9556C2.73963 11.8088 4.46518 12.2544 5.46517 12.8383C6.49732 13.4411 7.53737 13.9499 8.61923 14.4545M6.76741 7.6232C7.72113 6.39521 7.72778 4.66571 8.8436 3.44165C9.61698 2.59324 10.4966 1.7444 11.6643 1.47659C13.0158 1.16661 14.6899 0.926377 15.245 2.55629C15.8129 4.22365 14.0534 6.52817 13.3562 7.89433L10.6566 13.4362"
                stroke="#35302D"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </Box>
        </TextContainer>
      </IntroContainer>
    </ServicesContainer>
  );
}

export default Intro;
