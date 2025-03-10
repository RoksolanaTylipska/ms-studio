
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LanguageButton = styled('button')({
  cursor: 'pointer',
  textDecoration: 'none',
  margin: 0,
  padding: 0,
  justifyContent: 'center',
  color: "black",
  "&:hover": {
    textDecoration: "underline",
    textUnderlineOffset: "4px"
  },
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});
