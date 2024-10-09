import { Components } from "@mui/material";

export const MuiTextField: Components["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }: any) => {
      return {
        input: {
          color: theme.palette.colors.chocolate,
          fontFamily: "Comfortaa, sans-serif",
        },
        ".MuiFormHelperText-root": {
          color: theme.palette.colors.camel,
          fontFamily: "Comfortaa, sans-serif",
          "&.Mui-success": { color: "red" },
          "&.Mui-error": { color: theme.palette.colors.latte },
          "&.Mui-warning": { color: "#A85A00" },
        },
        ".MuiInputLabel-root": {
          color: theme.palette.colors.latte,
          fontFamily: "Comfortaa, sans-serif",
          "&.Mui-focused": {
            fontFamily: "Comfortaa, sans-serif",
            color: theme.palette.colors.latte,
          },
        },

        ".MuiInputBase-root": {
          border: `1px solid ${theme.palette.colors.chocolate}`,
          borderRadius: "50px",
          "&:hover": {
            background: theme.palette.colors.caramel,
          },
          "&.Mui-error": {
            borderColor: theme.palette.colors.chocolate,
            // color: theme.palette.colors.chocolate,
            fontSize: "12px",
          },
          "&.Mui-warning": {
            background: "#FFF5EB",
            borderColor: "#A85A00",
          },
          fieldset: {
            border: "none",
          },
        },
        "&.Mui-error": {
          borderColor: theme.palette.colors.gold,
          // color: theme.palette.colors.gold,
        },
      };
    },
  },
};
