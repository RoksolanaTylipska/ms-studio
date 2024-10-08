import { Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  AddressText,
  BlockContainer,
  FooterContainer,
  PhoneNumber,
  SocialMediaContainer,
  TextContainer,
  TopInfo,
  ScheduleText,
  PolicyText
} from "./styled";
import SocialMedia from "../SocialMedia";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <BlockContainer>
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

        <TextContainer sx={{ alignItems: "center" }}>
          <TopInfo>
            <Image
              src="/assets/icons/logo-brown.svg"
              alt="Logo"
              width={75}
              height={75}
              style={{ margin: "auto", paddingBottom: "10px" }}
            />
            <ScheduleText
              variant="bodyComfortaa"
            >
              {t("footer.schedule")}
            </ScheduleText>
          </TopInfo>

          <Link href={ROUTES.privacyPolicy}>
          <PolicyText variant="bodyComfortaa">
            {t("footer.privacy_policy")}
          </PolicyText>
          </Link>

        </TextContainer>

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
            {t("footer.rights")}</PolicyText>
        </TextContainer>
      </BlockContainer>
    </FooterContainer>
  );
};

export default Footer;
