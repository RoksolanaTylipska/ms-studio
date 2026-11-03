"use client";

import { Button } from "@/components";
import { ROUTES } from "@/constants/routes";
import ServiceCards from "@/features/servicePages/components/ServiceCards";
import { usePrices } from "@/context/PricesContext";
import {
  SERVICE_PAGES,
  ServicePage,
  servicePricesPath,
} from "@/features/servicePages/constants";
import { serviceFaq, servicePriceRange } from "@/features/servicePages/seo";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { ButtonColor, ButtonSize, ButtonType } from "@/types/button";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CARD_RADIUS, card, cardColors } from "@/styles/card";

const colors = {
  beige: "#F1EAE5",
  caramel: "#E0D6D0",
  latte: "#7B7167",
  gold: "#D9C6A4",
  chocolate: "#35302D",
  camel: "#83694E",
};
const bodyFont = "Comfortaa, sans-serif";
const headingFont = "'Playfair Display SC', serif";

const Section = ({
  children,
  tint,
  first,
}: {
  children: ReactNode;
  tint?: boolean;
  // The first section sits right under the fixed header: no big top padding
  first?: boolean;
}) => (
  <Box
    component="section"
    sx={{
      px: { xs: "20px", sm: "40px", md: "70px" },
      pt: first ? { xs: 2, md: 3 } : { xs: 6, md: 9 },
      pb: { xs: 6, md: 9 },
      backgroundColor: tint ? colors.caramel : "transparent",
      // Tinted sections run edge to edge although the page is capped at 1440px
      boxShadow: tint ? `0 0 0 100vmax ${colors.caramel}` : undefined,
      clipPath: tint ? "inset(0 -100vmax)" : undefined,
    }}
  >
    {children}
  </Box>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Typography variant="inherit"
    component="h2"
    sx={{
      fontFamily: headingFont,
      fontSize: { xs: "28px", md: "38px" },
      lineHeight: 1.25,
      color: colors.chocolate,
      textAlign: "center",
      mb: { xs: 3, md: 5 },
    }}
  >
    {children}
  </Typography>
);

const BodyText = ({ children }: { children: ReactNode }) => (
  <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: { xs: "15px", md: "16px" }, lineHeight: 1.8, color: colors.chocolate }}>
    {children}
  </Typography>
);

const InfoList = ({ title, items }: { title: string; items: string[] }) => (
  <Box
    sx={{
      ...card(cardColors.caramel),
      p: { xs: 3, md: 4 },
    }}
  >
    <Typography variant="inherit"
      component="h3"
      sx={{ fontFamily: headingFont, fontSize: { xs: "22px", md: "24px" }, color: colors.chocolate, mb: 2.5 }}
    >
      {title}
    </Typography>
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            display: "flex",
            gap: 1.5,
            fontFamily: bodyFont,
            fontSize: "14px",
            lineHeight: 1.7,
            color: colors.chocolate,
            "&::before": {
              content: '""',
              flexShrink: 0,
              width: 7,
              height: 7,
              mt: "9px",
              borderRadius: "50%",
              backgroundColor: colors.camel,
            },
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  </Box>
);

function ServicePageContent({ page }: { page: ServicePage }) {
  const { t, i18n } = useTranslation();
  const catalog = usePrices();
  const { handleModalWindow } = useModalWindowContext();
  const base = `servicePages.${page.key}`;
  const list = (key: string) => t(`${base}.${key}`, { returnObjects: true }) as unknown as string[];
  const others = SERVICE_PAGES.filter((p) => p.slug !== page.slug);
  const priceRange = servicePriceRange(catalog, page.priceSection);
  const faq = serviceFaq(page, i18n.language === "en" ? "en" : "ua", priceRange?.min);

  const bookButton = (
    <Button
      onClick={handleModalWindow}
      type={ButtonType.PRIMARY}
      color={ButtonColor.DARK}
      size={ButtonSize.MEDIUM}
    >
      {t("button.bookAppointment")}
    </Button>
  );

  return (
    // 84px clears the fixed site header
    <Box sx={{ pt: "84px" }}>
      {/* Intro */}
      <Section first>
        <Box
          component="nav"
          aria-label="breadcrumb"
          sx={{ fontFamily: bodyFont, fontSize: "13px", color: colors.latte, mb: 3, "& a": { color: colors.latte } }}
        >
          <Link href={ROUTES.home}>{t("header.home")}</Link>
          {" / "}
          <Link href={ROUTES.services}>{t("servicePages.common.breadcrumbServices")}</Link>
          {" / "}
          <Box component="span" sx={{ color: colors.chocolate }}>
            {t(page.name)}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
            gap: { xs: 4, md: 7 },
            // Text starts at the top so the heading sits right under the breadcrumbs
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start", pt: { md: 3 } }}>
            <Typography variant="inherit"
              component="h1"
              sx={{
                fontFamily: headingFont,
                fontSize: { xs: "34px", sm: "44px", md: "54px" },
                lineHeight: 1.15,
                color: colors.chocolate,
              }}
            >
              {t(`${base}.title`)}
            </Typography>
            <BodyText>{t(`${base}.intro`)}</BodyText>
            {page.key === "endosphere" && <BodyText>{t(`${base}.howItWorks`)}</BodyText>}
            {bookButton}
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              // Capped so the (heavily compressed) source photos are never upscaled
              maxWidth: { md: 520 },
              justifySelf: { md: "end" },
              aspectRatio: "1 / 1",
              borderRadius: CARD_RADIUS,
              overflow: "hidden",
            }}
          >
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              priority
              sizes="(max-width: 989px) 100vw, 520px"
              quality={90}
              style={{ objectFit: "cover", objectPosition: page.imagePosition }}
            />
          </Box>
        </Box>
      </Section>

      {/* Devices / methods */}
      {page.methods.length > 0 && (
        <Section>
          <SectionTitle>{t("servicePages.common.devicesTitle")}</SectionTitle>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: `repeat(${Math.min(page.methods.length, 2)}, 1fr)` },
              gap: 3,
              maxWidth: 960,
              mx: "auto",
            }}
          >
            {page.methods.map((method) => (
              <Box
                key={method.title}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 2,
                  ...card(cardColors.caramel),
                  p: { xs: 3, md: 4 },
                }}
              >
                <Box sx={{ position: "relative", width: 140, height: 140, borderRadius: "50%", overflow: "hidden" }}>
                  <Image src={method.img} alt={t(method.title)} fill sizes="140px" style={{ objectFit: "cover" }} />
                </Box>
                <Typography variant="inherit" component="h3" sx={{ fontFamily: headingFont, fontSize: "22px", color: colors.chocolate }}>
                  {t(method.title)}
                </Typography>
                <Typography variant="inherit" sx={{ fontFamily: bodyFont, fontSize: "14px", lineHeight: 1.7, color: colors.latte }}>
                  {t(method.description)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Section>
      )}

      {/* Prices: a short summary, the full list lives on /prices */}
      <Section tint>
        <Box
          sx={{
            maxWidth: 720,
            mx: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SectionTitle>
            {t("servicePages.common.prices")}: {t(page.name).toLowerCase()}
          </SectionTitle>
          {priceRange && (
            <Typography
              variant="inherit"
              sx={{ mt: { xs: -1.5, md: -3 }, fontFamily: headingFont, fontSize: { xs: "30px", md: "40px" }, color: colors.camel }}
            >
              {t("servicePages.common.priceFrom", { min: priceRange.min })}{" "}
              <Box component="span" sx={{ fontFamily: bodyFont, fontSize: "16px", color: colors.latte }}>
                {t(`servicePages.common.${page.priceUnit}`)}
              </Box>
            </Typography>
          )}
          <BodyText>{t("servicePages.common.pricesText")}</BodyText>
          <Box
            component={Link}
            href={servicePricesPath(page.slug)}
            sx={{
              mt: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 4,
              py: 1.5,
              borderRadius: "999px",
              border: `1px solid ${colors.chocolate}`,
              color: colors.chocolate,
              fontFamily: bodyFont,
              fontSize: "14px",
              textDecoration: "none",
              transition: "background-color .2s, color .2s",
              "&:hover": { backgroundColor: colors.chocolate, color: "#fff" },
            }}
          >
            {t("servicePages.common.pricesCta")} →
          </Box>
        </Box>
      </Section>

      {/* Preparation / aftercare / contraindications, or procedure / for whom / results */}
      {page.infoBlocks.length > 0 && (
        <Section>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: `repeat(${page.infoBlocks.length}, 1fr)` },
              gap: 3,
              alignItems: "start",
            }}
          >
            {page.infoBlocks.map(([title, items]) => (
              <InfoList key={items} title={t(`servicePages.${title}`)} items={list(items)} />
            ))}
          </Box>
          <Typography
            variant="inherit"
            sx={{ fontFamily: bodyFont, fontSize: "13px", color: colors.latte, textAlign: "center", mt: 3 }}
          >
            {t("servicePages.common.consultNote")}
          </Typography>
        </Section>
      )}

      {/* FAQ (also published as FAQPage structured data) */}
      <Section>
        <SectionTitle>{t("servicePages.common.faqTitle")}</SectionTitle>
        <Box sx={{ maxWidth: 860, mx: "auto", display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faq.map(({ q, a }) => (
            <Box
              key={q}
              component="details"
              sx={{
                ...card(cardColors.caramel),
                px: { xs: 2.5, md: 3.5 },
                "&[open] summary::after": { transform: "rotate(45deg)" },
              }}
            >
              <Box
                component="summary"
                sx={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 2.25,
                  fontFamily: bodyFont,
                  fontSize: { xs: "15px", md: "16px" },
                  fontWeight: 700,
                  color: colors.chocolate,
                  "&::-webkit-details-marker": { display: "none" },
                  "&::after": {
                    content: '"+"',
                    flexShrink: 0,
                    fontSize: "24px",
                    fontWeight: 400,
                    color: colors.camel,
                    transition: "transform .2s",
                  },
                }}
              >
                <Box component="h3" sx={{ m: 0, font: "inherit", color: "inherit", letterSpacing: 0 }}>
                  {q}
                </Box>
              </Box>
              <Box sx={{ pb: 2.5, mt: -0.5 }}>
                <BodyText>{a}</BodyText>
              </Box>
            </Box>
          ))}
        </Box>
      </Section>

      {/* Booking */}
      <Section tint>
        <Box sx={{ maxWidth: 640, mx: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
          <SectionTitle>{t("servicePages.common.ctaTitle")}</SectionTitle>
          <Box sx={{ mt: { xs: -1.5, md: -3 } }}>
            <BodyText>{t("servicePages.common.ctaText")}</BodyText>
          </Box>
          {bookButton}
        </Box>
      </Section>

      {/* Other services */}
      <Section>
        <SectionTitle>{t("servicePages.common.otherServices")}</SectionTitle>
        <ServiceCards pages={others} label={t("servicePages.common.otherServices")} />
      </Section>
    </Box>
  );
}

export default ServicePageContent;
