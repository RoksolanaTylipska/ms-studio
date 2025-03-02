import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Box } from "@mui/material";

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
      <video
        autoPlay
        loop
        muted
        playsInline
        onClick={handleModalWindow}
        style={{
          width: "70px",
          height: "70px",
          cursor: "pointer",
        }}
      >
        <source src="/assets/phone.webm" type="video/webm" />
      </video>
    </Box>
  );
};
