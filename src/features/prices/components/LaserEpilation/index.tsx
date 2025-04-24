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
      {lazerEpilation.map((type, i) => (
        <Accordion key={`type-${i}`}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {t(`${type.lazerType}`)}
          </AccordionSummary>

          <AccordionDetails>
            {type.info.map((group, j) => (
              <Accordion key={`group-${i}-${j}`}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  {t(group.gender)}
                </AccordionSummary>

                <AccordionDetails>
                  {group.complexes?.length && <LaserComplex complexes={group.complexes} />}
                  <LaserZone zones={group.zones} />
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default LaserEpilation;
