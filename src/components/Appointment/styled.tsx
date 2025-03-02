import { Box, Typography, styled } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800, 
  height: 500,
  backgroundColor: theme.palette.colors.beige, 
  boxShadow: theme.shadows[5], 
  padding: theme.spacing(4), 
  borderRadius: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "80px",
  [theme.breakpoints.down("sm")]: {
    width: '100%', 
    height: 500,  
  },
}));

export const InputsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px 0px"
});

export const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  width: "300px",
});

export const Description = styled(Typography)({ 
  padding: "10px 0px 5px"
});


export const ImageContainerMobile = styled(Box)({
  position: "relative", 
  width: "100%", 
  height: "260px"
});



