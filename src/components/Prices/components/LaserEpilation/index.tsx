"use client";

import { lazerEpilation } from "@/constants/lazerEpilation";
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
            {/* <AccordionDetails> */}
              <LaserComplex complexes={item.complexes} />
              <LaserZone zones={item.zones} />

            {/* </AccordionDetails> */}
            {/* <AccordionDetails>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  {t(`${item.zone}`)}
                </AccordionSummary>
                <AccordionDetails id="panel4-header">
                  <LaserZone zones={item.zones} />
                </AccordionDetails>
              </Accordion>
            </AccordionDetails> */}
          </Accordion>
        ))}
      </AccordionDetails>
    </>
  );
}

export default LaserEpilation;
