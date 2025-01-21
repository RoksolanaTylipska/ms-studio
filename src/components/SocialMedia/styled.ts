import { Box, BoxProps, styled } from "@mui/material";

interface SocialMediaCircleProps extends BoxProps {
  bgColor?: string; 
}

export const SocialMediaCircle = styled(Box)<SocialMediaCircleProps>(
  ({ theme, bgColor }) => ({
    backgroundColor: bgColor ? theme.palette.colors.camel : theme.palette.colors.gold,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })
);