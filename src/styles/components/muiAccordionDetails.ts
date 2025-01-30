import { Components } from "@mui/material";

export const MuiAccordionDetails: Components["MuiAccordionDetails"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontFamily: ["Vollkorn", "sans-serif"].join(", "),
      padding: "0px 0px 0px 20px",
      //@ts-ignore
      [theme.breakpoints.down("md")]: {
        padding: "0px",
      },
      //@ts-ignore
      [theme.breakpoints.down("sm")]: {
        padding: "0px",
      },
      "&#panel4-header": {
        fontSize: "16px",
        paddingTop: "15px",
      },
      
    }),
  },
};
