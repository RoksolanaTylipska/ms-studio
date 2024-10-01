
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LanguageButton = styled('button')({
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  justifyContent: 'center',
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});
