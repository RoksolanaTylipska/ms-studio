import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CARD_RADIUS } from "@/styles/card";

export const FeedbackContainer = styled(Box)(({ theme }) => ({
  padding: "56px 75px 75px",
  height: "auto",
  width: "100%",
  maxWidth: "1300px",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: "48px 30px 40px",
  },
}));

// The site's own review form, opened from the summary
export const FormsContainer = styled(Box)(({ theme }) => ({
  maxWidth: "720px",
  margin: "0 auto 32px",
  borderRadius: CARD_RADIUS,
  backgroundColor: theme.palette.colors.caramel,
  overflow: "hidden",
}));
