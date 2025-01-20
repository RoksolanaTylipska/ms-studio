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
  gap: "80px"
}));

export const InputsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px 0px"
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "300px",
}));

export const Description = styled(Typography)(({ theme }) => ({
  padding: "10px 0px 5px"
}));



