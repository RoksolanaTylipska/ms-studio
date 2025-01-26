import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TitleStars from "../TitleStars";
import { GalleryContainer, ModalContainer, ModalImage, PhotosContainer } from "./styled";

const Gallery = ({ images }: { images: number[] }) => {
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
      alt="Certificate"
      width={900}
      height={600} 
      objectFit="contain"
    />
  </ModalContainer>
)}
  </ModalContainer>
)}

      <TitleStars title={"masters.certificates"} />
      <PhotosContainer>
        {images.map((key) => (
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
              src={`/assets/photos/certificates/certificate-${key}.webp`}
              alt={`Certificate ${key}`}
              layout="fill"
              objectFit="cover"
              onClick={() =>
                handleOpenModal(
                  `/assets/photos/certificates/certificate-${key}.webp`
                )
              }
            />
          </Box>
        ))}
      </PhotosContainer>
    </GalleryContainer>
  );
};

export default Gallery;
