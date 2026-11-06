import { Button, CreateBeautyWithLove, TitleStars } from "@/components";
import { Seo } from "@/components/Seo";
import ServiceCards from "@/features/servicePages/components/ServiceCards";
import { SERVICE_PAGES } from "@/features/servicePages/constants";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { ButtonColor, ButtonSize, ButtonType } from "@/types/button";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { CARD_RADIUS } from "@/styles/card";

function Services() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  return (
    <>
      <Seo
        title="Послуги: лазерна епіляція, електроепіляція, депіляція | MS STUDIO LASER Львів"
        description="Лазерна епіляція, електроепіляція, воскова депіляція, шугаринг та ендосфера-терапія у Львові. Підберемо метод під ваш тип шкіри та волосся."
        path="/services"
      />

      {/* Compact intro: text and team photo side by side, 84px clears the fixed header */}
      <Box
        component="section"
        sx={{
          pt: { xs: "100px", md: "124px" },
          pb: { xs: 5, md: 7 },
          px: { xs: "20px", sm: "40px", md: "70px" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 7 },
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2.5 }}>
          <Typography
            variant="inherit"
            component="h1"
            sx={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: { xs: "27px", sm: "34px", md: "38px" },
              lineHeight: 1.2,
              color: "#35302D",
            }}
          >
            {t("services.intro.title")}
          </Typography>
          <Typography
            variant="inherit"
            sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: { xs: "15px", md: "16px" }, lineHeight: 1.8, color: "#7B7167" }}
          >
            {t("services.intro.subtitle")}
          </Typography>
          <Button
            onClick={handleModalWindow}
            type={ButtonType.PRIMARY}
            color={ButtonColor.DARK}
            size={ButtonSize.MEDIUM}
          >
            {t("button.bookAppointment")}
          </Button>
          <Box sx={{ alignSelf: { xs: "center", md: "flex-start" } }}>
            <CreateBeautyWithLove />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            // The team photo is almost square: show it whole instead of cropping
            aspectRatio: "1 / 1",
            maxHeight: { md: 620 },
            borderRadius: CARD_RADIUS,
            overflow: "hidden",
            // Photo on the left on desktop, above the text on mobile
            order: -1,
          }}
        >
          <Image
            src="/assets/photos/services_intro.webp"
            alt="Майстри студії MS STUDIO LASER у Львові"
            fill
            priority
            sizes="(max-width: 989px) 100vw, 50vw"
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>
      </Box>

      <Box component="section" sx={{ px: { xs: "20px", sm: "40px", md: "70px" }, pb: { xs: 7, md: 10 } }}>
        <TitleStars title="header.services" />
        <Box sx={{ mt: { xs: 3, md: 5 } }}>
          <ServiceCards pages={SERVICE_PAGES.filter((page) => !page.overview)} label="Послуги студії" />
        </Box>
      </Box>
    </>
  );
}

export default Services;
