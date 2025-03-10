import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Box } from "@mui/material";
import Image from "next/image";

export const PhoneAppointment = () => {
  const { handleModalWindow } = useModalWindowContext();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9,
      }}
    >
      <Image onClick={handleModalWindow} src="/assets/phone.png" alt="phone" width={64} height={64} /> 
    </Box>
  );
};
