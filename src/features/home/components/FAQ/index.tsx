"use client";

import { faqs } from "@/features/home/constants/faqs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { FAQContainer } from "./styled";
import { TitleStars } from "@/components";

function Faq() {
  const { t } = useTranslation();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: t(faq.question),
      acceptedAnswer: { "@type": "Answer", text: t(faq.answer) },
    })),
  };

  return (
    <FAQContainer>
      <Head>
        <script
          key="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <TitleStars title="faq.title" />
      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
              // Same look the theme gives to #panel1-header (ids are unique now)
              sx={(theme) => ({
                fontSize: "22px",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(0, 0, 0, .125)",
                [theme.breakpoints.down("md")]: { fontSize: "20px" },
                [theme.breakpoints.down("sm")]: { fontSize: "18px" },
              })}
            >
              {t(`${faq.question}`)}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="bodyComfortaa">
                <span
                  style={{
                    marginTop: "10px",
                    display: "block",
                    lineHeight: "20px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t(`${faq.answer}`).replace(
                      /<a\s+(.*?)>(.*?)<\/a>/g,
                      `<a $1 style="text-decoration: underline; color: black; font-size: 14px; font-family: Comfortaa;">$2</a>`
                    ),
                  }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </FAQContainer>
  );
}

export default Faq;
