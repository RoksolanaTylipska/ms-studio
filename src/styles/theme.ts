import { createTheme } from '@mui/material/styles';
import {
  MuiButton,
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
    };
  }
}

export const theme = createTheme({
  typography: typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          headline: 'h1',
          body: 'h1',
          subtitle: 'h1',
          footNote: 'h1',
        },
      },
    },
    MuiButton,
    MuiTextField,
    MuiIconButton,
  },
});
