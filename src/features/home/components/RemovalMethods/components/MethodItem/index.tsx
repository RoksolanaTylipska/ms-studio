import { servicePagePath } from "@/features/servicePages/constants";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ItemContainer, ItemDescription, ItemImageWrapper, MethodTitle, MoreButton } from "./styled";

interface MethodItemProps {
  method: {
    title: string;
    description: string;
    img: string;
    slug: string;
  };
}

function MethodItem({ method }: MethodItemProps) {
  const { t } = useTranslation();

  // The whole card leads to the service page; the button is only its visible cue
  return (
    <Link
      href={servicePagePath(method.slug)}
      aria-label={`${t(method.title)} — ${t("servicePages.common.more")}`}
      // display: contents keeps the card itself as the flex item of the row (so it
      // shrinks as before); globals.css gives links letter-spacing: 1px — reset it
      style={{ display: "contents", textDecoration: "none", color: "inherit", letterSpacing: "normal" }}
    >
      <ItemContainer>
        <span>
          <MethodTitle variant="h3">{t(method.title)}</MethodTitle>
          <ItemDescription>{t(method.description)}</ItemDescription>
        </span>
        <ItemImageWrapper>
          <Image
            src={method.img}
            alt={t(method.title)}
            fill
            sizes="150px"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </ItemImageWrapper>
        <MoreButton>{t("servicePages.common.more")} →</MoreButton>
      </ItemContainer>
    </Link>
  );
}

export default MethodItem;
