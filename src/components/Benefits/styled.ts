import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BenefitsContainer = styled(Box)(({ theme }) => ({
  padding: '120px 0px',
  display: 'flex',
  gap: '70px',
  flexDirection: 'column',
  [theme.breakpoints.down("sm")]: {
    padding: '70px 0px',
    gap: '50px',
  },
}));

export const BenefitsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginInline: '65px',
  [theme.breakpoints.down("sm")]: {
    flexDirection: 'column',
    margin: 'auto'
  },
}));

