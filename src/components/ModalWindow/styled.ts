import { Box, styled } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800, 
  height: 500,
  backgroundColor: theme.palette.colors.beige, 
  boxShadow: theme.shadows[5], 
  borderRadius: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "60px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "10px",
    height: "auto",
    padding: "30px 0",
    borderRadius: "15px",
    width: "95%"
  },

}));




