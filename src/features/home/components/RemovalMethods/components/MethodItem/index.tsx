import { SERVICE_PAGES, servicePagePath } from "@/features/servicePages/constants";
import Image from "next/image";
import Link from "next/link";
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
  const page = SERVICE_PAGES.find((p) => p.methods.some((m) => m.title === method.title));

  const card = (
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
    </ItemContainer>
  );

  // The whole card leads to the service page (alexandrite/diode → laser, etc.)
  return page ? (
    <Link
      href={servicePagePath(page.slug)}
      aria-label={`${t(method.title)} — ${t("servicePages.common.more")}`}
      // display: contents keeps the card itself as the flex item of the row (so it
      // shrinks as before); globals.css gives links letter-spacing: 1px — reset it
      style={{ display: "contents", textDecoration: "none", color: "inherit", letterSpacing: "normal" }}
    >
      {card}
    </Link>
  ) : (
    card
  );
}

export default MethodItem;
