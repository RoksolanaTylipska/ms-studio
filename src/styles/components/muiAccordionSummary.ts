import { Components } from "@mui/material";

export const MuiAccordionSummary: Components["MuiAccordionSummary"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      // @ts-ignore
      backgroundColor: theme.palette.colors.caramel,
      fontFamily: ["Vollkorn", "sans-serif"].join(", "),
      fontSize: "30px",
      padding: "0px",
      "&#panel1-header": {
        fontSize: "25px",
        padding: "0px",
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
      },
      "&#panel2-header": {
        fontSize: "25px",
        padding: "0px",
        // @ts-ignore
        color: theme.palette.colors.camel,
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
      },
      "&#panel3-header": {
        fontSize: "20px",
        margin: "0px",
      },
    }),
    content: {
      "&.Mui-expanded": {
        margin: "12px 0",
      },
    },
  },
};
