import { Theme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headline: React.CSSProperties;
    headlineBold: React.CSSProperties;
    body: React.CSSProperties;
    subtitle: React.CSSProperties;
    footNote: React.CSSProperties;
    captionBold: React.CSSProperties;
    bodyBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headline?: React.CSSProperties;
    headlineBold?: React.CSSProperties;
    body?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    footNote?: React.CSSProperties;
    captionBold?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
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
    bodyBold: true;
  }
}

export const typography: Partial<Theme['typography']> = {
  fontFamily: ['Vollkorn', 'sans-serif'].join(
    ', '
  ),
  h1: {
    fontSize: 52,
    fontWeight: 400,
    lineHeight: '64px',
    fontFamily: 'Gilroy-bold',
  },
  h2: {
    fontFamily: 'Vollkorn',
    fontWeight: 400,
    color: '#35302D',
    fontSize: '60px',
    textAlign: 'center',
  },
  h3: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: '48px',
  },
  h4: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '32px',
    fontFamily: 'Gilroy-bold',
  },
  headline: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.64px',
  },
  headlineBold: {
    fontFamily: ['Gilroy-bold', 'sans-serif'].join(', '),
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.64px',
  },
  body: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.56px;',
  },
  bodyBold: {
    fontFamily: ['Gilroy-bold', 'sans-serif'].join(', '),
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.56px;',
  },
  subtitle: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.72px;',
  },
  caption: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.48px;',
  },
  captionBold: {
    fontFamily: ['Gilroy-bold', 'sans-serif'].join(', '),
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.48px;',
  },
  footNote: {
    fontFamily: ['Gilroy', 'sans-serif'].join(', '),
    fontSize: 10,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.4px;',
  },

  h5: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '29px',
  },
  h6: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '15px',
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '20px',
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: 400,
  },
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
  button: {
    fontSize: 14,
    fontWeight: 400,
    textTransform: 'none',
  },
};
