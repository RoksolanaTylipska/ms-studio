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
                {t(`${faq.answer}`)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </FAQContainer>
  );
}

export default Faq;
