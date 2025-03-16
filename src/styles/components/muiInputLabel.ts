import { Components } from "@mui/material";

export const MuiInputLabel: Components["MuiInputLabel"] = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      color: theme.palette.colors.camel,
      fontFamily: "Comfortaa, sans-serif",
      fontSize: "14px",

      "&.Mui-focused": {
        color: theme.palette.colors.camel, 
        marginTop: "-6px",
      },
      "&.MuiFormLabel-filled": {
        marginTop: "-6px",
      }
    }),
  },
};
