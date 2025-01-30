"use client";

import TitleStars from "@/components/TitleStars";
import { faqs } from "@/constants/faqs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FAQContainer } from "./styled";

function Faq() {
  const { t } = useTranslation();

  return (
    <FAQContainer>
      <TitleStars title={t("faq.title")} />

      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel1-content`}
              id={`panel1-header`}
            >
              {t(`${faq.question}`)}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="bodyComfortaa">
                <span
                  style={{ marginTop: "10px", display: "block", lineHeight: "20px" }}
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
