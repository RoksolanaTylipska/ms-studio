import {
  modalServices,
  otherServices,
} from "@/features/prices/constants/services";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContainer, PricesBox, ServicesBox } from "./styled";

function PriceModal() {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [priceImage, setPriceImage] = useState<string>("");

  const handleOpenModal = (image: string) => {
    setPriceImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPriceImage("");
  };

  const renderServiceItem = (name: string, image: string) => (
    <ServicesBox key={name} onClick={() => handleOpenModal(image)}>
      <Image
        alt="Download icon"
        width={25}
        height={25}
        src="/assets/icons/download.svg"
        style={{ cursor: "pointer" }}
      />{" "}
      <Typography variant="bodyComfortaa">{t(name)}</Typography>
    </ServicesBox>
  );

  return (
    <>
      {isModalOpen && (
        <ModalContainer onClick={handleCloseModal}>
          <Image src={priceImage} alt="Price list" width={900} height={600} />
        </ModalContainer>
      )}

      <PricesBox>
        <Typography variant="h4">{t("services.gender.womens")}</Typography>
        {modalServices.map(({ title, images }) =>
          renderServiceItem(title, images.womens || "")
        )}
        <Typography variant="h4">{t("services.gender.mens")}</Typography>
        {modalServices.map(({ title, images }) =>
          renderServiceItem(title, images.mens || "")
        )}
        <Typography variant="h4">{t("services.other")}</Typography>
        {otherServices.map(({ title, image }) =>
          renderServiceItem(title, image)
        )}
      </PricesBox>
    </>
  );
}

export default PriceModal;
