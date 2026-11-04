import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fullBleed } from "@/styles/fullBleed";

export const FAQContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,
  ...fullBleed(theme.palette.colors.caramel),
  padding: '100px 75px 120px;',
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "80px",
  [theme.breakpoints.down("sm")]: {
    padding: "70px 30px",
    gap: "40px",
  },
}));

