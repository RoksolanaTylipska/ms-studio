"use client";

import { lazerEpilation } from "@/features/prices/constants/lazerEpilation";
import { ExpandMore } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import LaserComplex from "../LaserComplex";
import LaserZone from "../Zones";

function LaserEpilation() {
  const { t } = useTranslation();

  return (
    <>
      <AccordionDetails>
        {lazerEpilation.map((item, i) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              {t(`${item.gender}`)}
            </AccordionSummary>
            <LaserComplex complexes={item.complexes} />
            <LaserZone zones={item.zones} />
          </Accordion>
        ))}
      </AccordionDetails>
    </>
  );
}

export default LaserEpilation;
