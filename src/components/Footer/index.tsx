import { ROUTES } from "@/constants/routes";
import { useResponsive } from "@/hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  AddressText,
  BlockContainer,
  FooterContainer,
  PhoneNumber,
  PolicyText,
  ScheduleText,
  SocialMediaContainer,
  TextContainer,
  TopInfo,
} from "./styled";
import { SocialMedia } from "@/components";

export const Footer = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <BlockContainer>
        {!isMobile && (
          <TextContainer sx={{ alignItems: "start" }}>
            <TopInfo>
              <AddressText variant="bodyComfortaa">
                {t("footer.address")}
              </AddressText>
              <AddressText variant="bodyComfortaa">
                {t("footer.city")}
              </AddressText>
            </TopInfo>

            <PolicyText variant="bodyComfortaa">
              {t("footer.msStudio")}
            </PolicyText>
          </TextContainer>
        )}

        <TextContainer sx={{ alignItems: "center" }}>
          <TopInfo>
            <Link href={"/"} style={{margin: "auto"}}>
            <Image
              src="/assets/icons/logo-brown.svg"
              alt="Logo"
              width={75}
              height={75}
              style={{ margin: "auto", paddingBottom: "10px" }}
            />
            </Link>
            <ScheduleText variant="bodyComfortaa">
              {t("footer.schedule")}
            </ScheduleText>
          </TopInfo>

          <Link href={ROUTES.privacyPolicy}>
            <PolicyText variant="bodyComfortaa">
              {t("footer.privacy_policy")}
            </PolicyText>
          </Link>
        </TextContainer>

        {!isMobile && (
          <TextContainer sx={{ alignItems: "end" }}>
            <TopInfo>
              <PhoneNumber href="tel:+380980303093">
                +380 (98) 030 3093
              </PhoneNumber>
              <SocialMediaContainer>
                <SocialMedia img={"/assets/icons/instagram.svg"} />
                <SocialMedia img={"/assets/icons/tiktok.svg"} />
              </SocialMediaContainer>
            </TopInfo>

            <PolicyText variant="bodyComfortaa">
              {t("footer.rights")} {currentYear}
            </PolicyText>
          </TextContainer>
        )}
      </BlockContainer>
    </FooterContainer>
  );
};
