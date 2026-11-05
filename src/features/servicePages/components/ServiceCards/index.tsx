"use client";

import { ServicePage, servicePagePath } from "@/features/servicePages/constants";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { card, cardColors, cardHover } from "@/styles/card";

// Links to the service pages: used on /services and under each service page
function ServiceCards({ pages, label }: { pages: ServicePage[]; label: string }) {
  const { t } = useTranslation();

  return (
    <Box
      component="nav"
      aria-label={label}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: `repeat(${pages.length > 4 ? 3 : pages.length}, 1fr)`,
        },
        gap: 3,
      }}
    >
      {pages.map((page) => {
        return (
          <Box
            key={page.slug}
            component={Link}
            href={servicePagePath(page.slug)}
            sx={{
              display: "flex",
              flexDirection: "column",
              ...card(cardColors.caramel),
              ...cardHover,
              overflow: "hidden",
              textDecoration: "none",
              letterSpacing: "normal",
              "&:hover img": { transform: "scale(1.04)" },
            }}
          >
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 989px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: page.imagePosition, transition: "transform .5s" }}
              />
            </Box>
            <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
              <Typography
                variant="inherit"
                sx={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: "20px",
                  lineHeight: 1.3,
                  color: "#35302D",
                }}
              >
                {t(page.name)}
              </Typography>
              <Typography
                variant="inherit"
                sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: "13px", lineHeight: 1.6, color: "#7B7167" }}
              >
                {t(`servicePages.${page.key}.card`)}
              </Typography>
              <Box
                sx={{
                  mt: "auto",
                  pt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  fontFamily: "Comfortaa, sans-serif",
                  fontSize: "13px",
                  color: "#83694E",
                }}
              >
                <span>{t("servicePages.common.more")} →</span>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default ServiceCards;
