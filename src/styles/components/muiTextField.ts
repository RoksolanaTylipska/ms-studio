import { Components } from "@mui/material";

export const MuiTextField: Components["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      input: {
        color: theme.palette.colors.chocolate,
        fontFamily: "Comfortaa, sans-serif",
        fontSize: "12px",
      },
      ".MuiFormHelperText-root": {
        color: theme.palette.colors.camel,
        fontFamily: "Comfortaa, sans-serif",
        "&.Mui-success": { color: "red" },
        "&.Mui-warning": { color: "#A85A00" },
      },
      ".MuiInputLabel-root": {
        color: theme.palette.colors.latte,
        fontFamily: "Comfortaa, sans-serif",
      },
      ".MuiInputLabel-root.Mui-focused, .MuiInputLabel-root.MuiFormLabel-filled": {
        marginTop: "-5px",
        color: theme.palette.colors.latte,
        fontFamily: "Comfortaa, sans-serif",
      },
      ".MuiInputBase-root": {
        border: `1px solid ${theme.palette.colors.chocolate}`,
        borderRadius: "20px",
        "&:hover": {
          background: theme.palette.colors.caramel,
        },
        "&.Mui-error": {
          borderColor: "red",
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
      },
    }),
  },
};
