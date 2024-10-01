import { styled } from "@mui/material/styles";

export const FooterContainer = styled("footer")(({ theme }) => ({
  position: "fixed",
  display: "flex",
  backgroundColor: theme.palette.colors.chocolate,
  margin: "auto",
  bottom: 0,
  left: 0,
  right: 0,
  height: "84px",
  paddingInline: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 1)",
}));
