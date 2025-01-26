import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TitleStars from "../TitleStars";
import {
  GalleryContainer,
  ModalContainer,
  ModalImage,
  PhotosContainer,
} from "./styled";

const GalleryClientSide = ({
  count,
  path,
  title = true,
}: {
  count: number[];
  path: string;
  title?: boolean;
}) => {
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
  return (
    <GalleryContainer>
      {isModalOpen && (
        <ModalContainer onClick={handleCloseModal}>
          {isModalOpen && (
            <ModalContainer onClick={handleCloseModal}>
              <ModalImage
                src={priceImage}
                alt={title ? "Certificate" : "Photo"}
                width={900}
                height={600}
                objectFit="contain"
              />
            </ModalContainer>
          )}
        </ModalContainer>
      )}

      {title && <TitleStars title={"masters.certificates"} />}
      <PhotosContainer>
        {count.map((key) => (
          <Box
            key={key}
            sx={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <Image
              src={`${path}-${key}.webp`}
              alt={`Certificate ${key}`}
              layout="fill"
              objectFit="cover"
              onClick={() => handleOpenModal(`${path}-${key}.webp`)}
            />
          </Box>
        ))}
      </PhotosContainer>
    </GalleryContainer>
  );
};

export default GalleryClientSide;
