import { ButtonColor, ButtonSize } from "@/types/button";
import { Theme, styled } from "@mui/material/styles";

interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  theme?: Theme;
}

export const StyledPrimaryButton = styled("button")<ButtonProps>(({ theme, size }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  backgroundColor: "#35302D",
  color: "#F1EAE5",
  height: "40px",
  maxWidth: "300px",
  width: (() => {
    switch (size) {
      case "small":
        return "120px";
      case "medium":
        return "200px";
      case "large":
        return "297px";
      default:
        return "100%";
    }
  })(),
  padding: (() => {
    switch (size) {
      case "small":
        return "5px 10px";
      case "large":
        return "35px 30px";
      default:
        return "10px 20px";
    }
  })(),
  borderRadius: "50px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
  fontSize: (() => {
    switch (size) {
      case "small":
        return "13px";
      case "large":
        return "28px";
      default:
        return "14px";
    }
  })(),
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: (() => {
      switch (size) {
        case "large":
          return "24px";
        default:
          return "12px";
      }
    })(),
    width: (() => {
      switch (size) {
        case "large":
          return "200px";
        default:
          return "100%";
      }
    })(),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "8px 15px",
    width: "100%",
  },
}));

export const StyledSecondaryButton = styled("button")<ButtonProps>(({ theme, size, color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  backgroundColor: "transparent",
  color: (() => {
    switch (color) {
      case "light":
        return "#ffffff";
      case "dark":
        return "#35302D";
      default:
        return "#35302D";
    }
  })(),
  height: "40px",
  maxWidth: "300px",
  width: (() => {
    switch (size) {
      case "small":
        return "100px";
      case "medium":
        return "150px";
      case "large":
        return "297px";
      default:
        return "100%";
    }
  })(),
  padding: (() => {
    switch (size) {
      case "small":
        return "5px 10px";
      case "large":
        return "35px 30px";
      default:
        return "10px 20px";
    }
  })(),
  borderRadius: "50px",
  border: (() => {
    switch (color) {
      case "light":
        return `2px solid #ffffff`;
      case "dark":
        return `2px solid #35302D`;
      default:
        return "2px solid #35302D";
    }
  })(),
  cursor: "pointer",
  transition: "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
  fontSize: (() => {
    switch (size) {
      case "small":
        return "10px";
      case "large":
        return "28px";
      default:
        return "14px";
    }
  })(),
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    padding: "20px 25px",
    width: "70%",
  },
}));
