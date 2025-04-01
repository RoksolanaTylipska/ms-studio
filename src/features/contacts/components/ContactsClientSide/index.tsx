"use client";

import { useTranslation } from "react-i18next";
import {
  AddressText,
  ContactsContainer,
  InfoContainer,
  MapContainer,
  PhoneNumber,
  ScheduleText,
  SocialMediaContainer,
} from "./styled";
import { SocialMedia } from "@/components";

function ContactsClientSide() {
  const { t } = useTranslation();

  return (
    <ContactsContainer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7001.238469868146!2d24.00645644957941!3d49.84458311158015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add73ddc375c5%3A0xe369c1e7d73112d1!2zTVMgU1RVRElPINCb0LDQt9C10YDQvdCwINC10L_RltC70Y_RhtGW0Y8g0JXQu9C10LrRgtGA0L4g0JvRjNCy0ZbQsiDQqNGD0LPQsNGA0LjQvdCzINCS0ZbRgdC6INCa0YPRgNGB0Lg!5e0!3m2!1suk!2sua!4v1737407485256!5m2!1suk!2sua"
        width="100%"
        height="450"
        style={{ borderRadius: "15px", border: "0px" }}
        loading="lazy"
      ></iframe>

      <MapContainer>
        <InfoContainer>
          <AddressText variant="bodyComfortaa">
            {t("footer.address")}
          </AddressText>

          <ScheduleText variant="bodyComfortaa">
            {t("footer.schedule")}
          </ScheduleText>
          <PhoneNumber href="tel:+380980303093">+380 (98) 030 3093</PhoneNumber>
          <SocialMediaContainer>
            <SocialMedia
              bgColor={"dark"}
              img={"/assets/icons/instagram-dark.svg"}
            />
            <SocialMedia
              bgColor={"dark"}
              img={"/assets/icons/tiktok-dark.svg"}
            />
          </SocialMediaContainer>
        </InfoContainer>
      </MapContainer>
    </ContactsContainer>
  );
}

export default ContactsClientSide;
