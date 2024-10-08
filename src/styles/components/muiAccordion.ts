
import { Components } from '@mui/material';

export const MuiAccordion: Components['MuiAccordion'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: 'none',
      boxShadow: 'none',
      fontFamily: ["Vollkorn", 'sans-serif'].join(', '),
      fontWeight: 300,
      padding: "10px 0px",
      // @ts-ignore
      backgroundColor: theme.palette.colors.caramel,
      
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 'auto',
      },
      '&.MuiAccordion-heading': {
        fontSize: "30px",
      }
      
    }),
  },
};
