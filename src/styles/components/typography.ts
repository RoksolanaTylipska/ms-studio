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
    fontSize: "60px",
    textAlign: "center",
  },
  h3: {
    fontFamily: ["Vollkorn", 'sans-serif'].join(', '),
    fontWeight: 400,
    color: "#35302D",
    fontSize: "25px",
    textAlign: "center",
  },
  // h4: {
  //   fontSize: 24,
  //   fontWeight: 600,
  //   lineHeight: '32px',
  //   fontFamily: 'Gilroy-bold',
  // },
  body: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.56px;',
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
  // h5: {
  //   fontSize: 24,
  //   fontWeight: 400,
  //   lineHeight: '29px',
  // },
  // h6: {
  //   fontSize: 12,
  //   fontWeight: 700,
  //   lineHeight: '15px',
  // },
  body1: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '18px',
    '@media (max-width:1400px)': {
      fontSize: 12,
    },
  },
  body2: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '14px',
    '@media (max-width:1400px)': {
      fontSize: 10,
    },
  },
};
