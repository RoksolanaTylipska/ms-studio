import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BenefitsContainer, BenefitsList, TitleContainer } from "./styled";
import BenefitItem from "../BenefitItem";
import { benefits } from "@/constants/benefits";

function Benefits() {
  const { t } = useTranslation();

  return (
    <BenefitsContainer>
      <TitleContainer>
        <h2>{t("home.benefits.whyUs")}</h2>
        <Image src="/assets/icons/stars.svg" alt="Stars Icon" width={50} height={50} />
      </TitleContainer>
      <BenefitsList>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} benefit={benefit} />
        ))}
      </BenefitsList>
    </BenefitsContainer>
  );
}

export default Benefits;
