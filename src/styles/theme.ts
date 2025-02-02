import { createTheme } from '@mui/material/styles';
import {
  MuiButton,
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  MuiIconButton,
  MuiTextField,
  typography,
} from './components';

declare module '@mui/material/styles' {
  interface Palette {
    colors: {
      white: string;
      black: string;
      beige: string;
      caramel: string;
      latte: string;
      gold: string;
      chocolate: string;
      gray: string;
      camel: string
    };
  }
  interface PaletteOptions {
    colors?: {
      white?: string;
      black?: string;
      beige?: string;
      caramel?: string;
      latte?: string;
      gold?: string;
      chocolate?: string;
      gray?: string;
      camel?: string
    };
  }
}

export const theme = createTheme({
  typography: typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 990,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      beige: "#F1EAE5",
      caramel: "#E0D6D0",
      latte: "#7B7167",
      gold: "#D9C6A4",
      chocolate: "#35302D",
      gray: '#DBDBD9',
      camel: "#83694E"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
        },
      },
    },
    // MuiTypography: {
    //   defaultProps: {
    //     variantMapping: {
    //       headline: 'h2',
    //       body: 'h1',
    //       subtitle: 'h1',
    //       footNote: 'h1',
    //     },
    //   },
    // },
    MuiButton,
    MuiTextField,
    MuiIconButton,
    MuiAccordion,
    MuiAccordionSummary,
    MuiAccordionDetails,
  },
});
