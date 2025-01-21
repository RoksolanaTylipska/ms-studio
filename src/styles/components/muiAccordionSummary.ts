// @ts-nocheck

import { Components } from "@mui/material";

export const MuiAccordionSummary: Components["MuiAccordionSummary"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.colors.caramel,
      fontFamily: ["Vollkorn", "sans-serif"].join(", "),
      fontSize: "30px",
      padding: "0px",
      [theme.breakpoints.down("md")]: {
        fontSize: "25px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
      "&#panel1-header": {
        fontSize: "25px",
        padding: "0px",
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        [theme.breakpoints.down("md")]: {
          fontSize: "22px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },
      "&#panel2-header": {
        fontSize: "25px",
        padding: "0px",
        // @ts-ignore
        color: theme.palette.colors.camel,
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        [theme.breakpoints.down("md")]: {
          fontSize: "22px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },
      "&#panel3-header": {
        fontSize: "20px",
        margin: "0px",
        [theme.breakpoints.down("md")]: {
          fontSize: "18px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "16px",
        },
      },
    }),
    content: {
      "&.Mui-expanded": {
        margin: "12px 0",
      },
    },
  },
};
