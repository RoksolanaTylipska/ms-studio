import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ItemContainer, ItemDescription, ItemImageWrapper, MethodTitle } from "./styled";

interface MethodItemProps {
  method: {
    title: string;
    description: string;
    img: string;
  };
}

function MethodItem({ method }: MethodItemProps) {
  const { t } = useTranslation();

  return (
    <ItemContainer>
      <span>
        <MethodTitle variant="h3">{t(method.title)}</MethodTitle>
        <ItemDescription>{t(method.description)}</ItemDescription>
      </span>
      <ItemImageWrapper>
        <Image
          src={method.img}
          alt="photo"
          fill
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </ItemImageWrapper>
    </ItemContainer>
  );
}

export default MethodItem;
