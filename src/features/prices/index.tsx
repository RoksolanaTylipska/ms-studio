"use client";

import { TitleStars } from "@/components";
import { services } from "@/features/prices/constants/services";
import { SERVICE_PAGES } from "@/features/servicePages/constants";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Image from "next/image";
import { ElementType, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PricesContainer } from "./styled";

const slugFor = (title: string) =>
  SERVICE_PAGES.find((p) => p.name === title || p.pricesTitle === title)?.slug;

function Prices({ mainTitle, titleComponent }: { mainTitle: string; titleComponent?: ElementType }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // /prices#laser-epilation opens that section and scrolls to it
  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const service = services.find(({ title }) => slugFor(title) === hash);
      if (!service) return;
      setExpanded((prev) => new Set(prev).add(service.title));
      setTimeout(
        () => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (title: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <PricesContainer>
      <TitleStars title={mainTitle} filledStars={true} lines={true} component={titleComponent} />
      <Box>
        {services.map(({ title, Component }) => (
          <Accordion
            key={title}
            id={slugFor(title)}
            expanded={expanded.has(title)}
            onChange={() => toggle(title)}
            sx={{ scrollMarginTop: "110px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {t(title)}
                {title === "services.endosphere" && (
                  <Image
                    src="/assets/icons/new-icon.png"
                    alt="new"
                    width={40}
                    height={40}
                  />
                )}
              </Box>
            </AccordionSummary>

            {/* Space between the section heading's divider and the prices */}
            <AccordionDetails sx={{ pt: { xs: 2.5, sm: 3.5 } }}>
              <Component />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </PricesContainer>
  );
}

export default Prices;
