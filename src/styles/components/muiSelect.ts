import { Components } from "@mui/material";

export const MuiSelect: Components["MuiSelect"] = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      color: theme.palette.colors.chocolate,
      fontFamily: "Comfortaa, sans-serif",
      fontSize: "12px",
      border: `1px solid ${theme.palette.colors.chocolate}`,
      borderRadius: "20px",

      "&:hover": {
        background: theme.palette.colors.caramel,
      },
      "&.Mui-focused": {
        background: theme.palette.colors.caramel,
        color: theme.palette.colors.chocolate,
      },
      fieldset: {
        border: "none",
      },
      ".MuiSelect-icon": {
        color: theme.palette.colors.chocolate,
      },
      "&.Mui-error": {
        border: "1px solid red",
      },
      
    }),
  },
};
