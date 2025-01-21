import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { TitleContainer } from "./styled";

interface TitleStarsProps {
  title: string;
  filledStars?: boolean;
  lines?: boolean;
}

function TitleStars({ title, filledStars = false, lines = false }: TitleStarsProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");


  return (
    <TitleContainer>
      {lines && (
        <Image
          src="/assets/icons/line.svg"
          alt="Stars Icon"
          width={10}
          height={70}
          style={{ width: "20%", marginRight: "15px" }}
        />
      )}
      <Typography variant="h2">{t(`${title}`)}</Typography>
      {filledStars ? (
        <Image
          src="/assets/icons/stars-filled.svg"
          alt="Filled Stars Icon"
          width={isMobile ? 30 : 60}
          height={isMobile ? 30 : 60}
        />
      ) : (
        <Image
          src="/assets/icons/stars.svg"
          alt="Empty Stars Icon"
          width={isMobile ? 30 : 50}
          height={isMobile ? 30 : 50}
        />
      )}
      {lines && (
        <Image
          src="/assets/icons/line.svg"
          alt="Stars Icon"
          width={10}
          height={70}
          style={{ width: "20%", marginLeft: "15px" }}
        />
      )}
    </TitleContainer>
  );
}

export default TitleStars;
