import { Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ThankYouContainer, ThankYouText } from "./styled";

const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <ThankYouContainer>
      <ThankYouText variant="bodyCaveat">
        {t("modalWindow.thanks")}
      </ThankYouText>
      <Typography
        sx={{ fontSize: "20px", maxWidth: "350px", textAlign: "center" }}
        variant="h5"
      >
        {t("modalWindow.thankYou")}
      </Typography>
      <Image
        src="/assets/icons/stars.svg"
        alt="Empty Stars Icon"
        width={50}
        height={50}
      />
    </ThankYouContainer>
  );
};

export default ThankYou;
