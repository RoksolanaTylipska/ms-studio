import { Theme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headline: React.CSSProperties;
    headlineBold: React.CSSProperties;
    body: React.CSSProperties;
    subtitle: React.CSSProperties;
    footNote: React.CSSProperties;
    bodyComfortaa: React.CSSProperties;
    bodyCaveat?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headline?: React.CSSProperties;
    headlineBold?: React.CSSProperties;
    body?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    footNote?: React.CSSProperties;
    bodyComfortaa?: React.CSSProperties;
    bodyCaveat?: React.CSSProperties;

  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headline: true;
    headlineBold: true;
    body: true;
    subtitle: true;
    footNote: true;
    captionBold: true;
    bodyComfortaa: true;
    bodyCaveat: true;
  }
}

export const typography: Partial<Theme['typography']> = {
  fontFamily: ['Vollkorn', 'sans-serif'].join(
    ', '
  ),
  h1: {
    fontFamily: ['Playfair Display SC', 'sans-serif'].join(', '),
    fontWeight: 400,
  },
  h2: {
    fontFamily: ["Vollkorn", 'sans-serif'].join(', '),
    fontWeight: 400,
    color: "#35302D",
    fontSize: "55px",
    textAlign: "center",
  },
  h3: {
    fontFamily: ["Vollkorn", 'sans-serif'].join(', '),
    fontWeight: 400,
    color: "#35302D",
    fontSize: "25px",
    textAlign: "center",
  },
  h4: {
    fontFamily: ["Vollkorn", 'sans-serif'].join(', '),
    fontWeight: 300,
    color: "#35302D",
    fontSize: "20px",
  },
  h5: {
    fontFamily: ["Comfortaa", 'sans-serif'].join(', '),
    fontWeight: 500,
    color: "#35302D",
    fontSize: "18px",
  },
  body: {
    fontFamily: ["Comfortaa", 'sans-serif'].join(', '),
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '26px',
  },
  bodyComfortaa: {
    fontFamily: ['Comfortaa', 'sans-serif'].join(', '),
    fontSize: 14,
    fontWeight: 400,
  },
  bodyCaveat: {
    fontFamily: ['Caveat', 'cursive'].join(', '),
    fontSize: 20,
    fontWeight: 400,
  },
  body1: {
    fontFamily: ['Comfortaa', 'sans-serif'].join(', '),
    fontSize: 14,
    fontWeight: 400,
    color: "#83694E",
    lineHeight: '15px',
    '@media (max-width:1400px)': {
      fontSize: 12,
    },
  },
  body2: {
    fontFamily: ['Comfortaa', 'sans-serif'].join(', '),
    color: "#83694E",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '14px',
    '@media (max-width:1400px)': {
      fontSize: 10,
    },
  },
};
