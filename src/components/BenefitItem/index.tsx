import { useTranslation } from "react-i18next";
import { ItemContainer, ItemDescription, ItemImageWrapper } from "./styled";
import Image from "next/image";
import { Typography } from "@mui/material";

interface BenefitItemProps {
  benefit: {
    title: string;
    description: string;
    img: string;
  };
}

function BenefitItem({ benefit }: BenefitItemProps) {
  const { t } = useTranslation();

  return (
    <ItemContainer>
      <span>
        <Typography variant="h3">{t(benefit.title)}</Typography>
        <ItemDescription>{t(benefit.description)}</ItemDescription>
      </span>
      <ItemImageWrapper>
        <Image src={benefit.img} alt={"photo"} width={150} height={150} style={{borderRadius: "50%"}}/>
      </ItemImageWrapper>{" "}
    </ItemContainer>
  );
}

export default BenefitItem;
