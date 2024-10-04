import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BenefitsContainer, BenefitsList } from "./styled";
import BenefitItem from "../BenefitItem";
import { benefits } from "@/constants/benefits";
import TitleStars from "@/components/TitleStars";

function Benefits() {
  const { t } = useTranslation();

  return (
    <BenefitsContainer>
        <TitleStars title={"home.benefits.whyUs"}/>
      <BenefitsList>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} benefit={benefit} />
        ))}
      </BenefitsList>
    </BenefitsContainer>
  );
}

export default Benefits;
