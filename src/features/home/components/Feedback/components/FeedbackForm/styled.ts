import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Form = styled(Box)(({ theme }) => ({
  padding: "28px",
  // Fields without frames: light fill on the coloured block; errors keep
  // their red outline
  "&& .MuiInputBase-root, && .containerClass": {
    border: "1px solid transparent",
    backgroundColor: theme.palette.colors.beige,
    "&:hover, &.Mui-focused": { backgroundColor: theme.palette.colors.white },
    "&.Mui-error": { borderColor: "red" },
  },
  "&& .containerClassError": {
    backgroundColor: theme.palette.colors.beige,
  },
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "25px",
}));


export const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "center",
  gap: 2,
  marginLeft: "10px",
}));
