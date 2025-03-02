"use client";

import { useMediaQuery } from "@mui/material";

import { useTranslation } from "react-i18next";
import { StudentsContainer } from "./styled";

function Students() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <StudentsContainer>
      
    </StudentsContainer>
  );
}

export default Students;
