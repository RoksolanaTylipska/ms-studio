import { BenefitsContainer, BenefitsList } from "./styled";
import BenefitItem from "../BenefitItem";
import { benefits } from "@/constants/benefits";
import TitleStars from "@/components/TitleStars";

function Benefits() {

  return (
    <BenefitsContainer>
        <TitleStars title={"benefits.title"}/>
      <BenefitsList>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} benefit={benefit} />
        ))}
      </BenefitsList>
    </BenefitsContainer>
  );
}

export default Benefits;
