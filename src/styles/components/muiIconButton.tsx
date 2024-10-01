import { Components } from '@mui/material';

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    extraSmall: true;
  }
}

export const MuiIconButton: Components['MuiIconButton'] = {
  variants: [
    {
      props: { size: 'extraSmall' },
      style: {
        borderRadius: '4px',
        padding: '3px',
        height: '24px',
        width: '24px',
        svg: {
          width: '14px',
          height: '14px',
        },
      },
    },
  ],
  styleOverrides: {
    root: ({ theme, ownerState }: any) => {
      const commonStyles = {
        borderRadius: '8px',
        padding: '8px',
        height: '40px',
        svg: {
          width: '24px',
          height: '24px',
        },
      };

      if (ownerState.color === 'primary') {
        return {
          ...commonStyles,
          background: theme.palette.primary.p400,
          color: theme.colors.new.white.p25,
          ':hover': {
            background: theme.palette.primary.p500,
            color: theme.colors.new.white.p25,
            svg: {
              color: theme.colors.new.white.p25,
            },
          },

          ':disabled': {
            color: theme.palette.primary.p100,
            background: theme.palette.primary.p25,
          },
        };
      }
      if (ownerState.color === 'secondary') {
        return {
          ...commonStyles,
          background: 'transparent',
          color: theme.colors.new.grey.p400,
          border: `1.5px solid ${theme.palette.primary.p300}`,
          svg: {
            color: theme.palette.primary.p500,
          },
          ':hover': {
            background: theme.palette.primary.p25,
          },
          ':disabled': {
            background: theme.palette.primary.p25,
            border: `1px solid ${theme.palette.primary.p100}`,
            svg: {
              color: theme.palette.primary.p100,
            },
          },
        };
      }
      //TODO: remove this after finish redesign
      if (ownerState.color === 'error') {
        return {
          ...commonStyles,
          border: '1px solid #FC5454',
          svg: {
            color: '#FC5454',
          },
          ':hover': {},
          ':disabled': {},
        };
      }
      return {
        ...commonStyles,
        background: '#003F47',
        svg: {
          color: '#F9FAFB',
        },
        ':hover': {
          background: '#00363D',
          svg: {
            color: '#80EAE0',
          },
        },
        ':disabled': {
          color: '#D0D5DD',
          background: theme.colors.new.white.p400,
        },
      };
    },
    sizeSmall: () => {
      return {
        borderRadius: '4px',
        padding: '6px',
        height: '32px',
        width: '32px',
        svg: {
          width: '20px',
          height: '20px',
        },
      };
    },
    sizeLarge: () => {
      return {
        borderRadius: '16px',
        padding: '12px',
        height: '56px',
        width: '56px',
        svg: {
          width: '32px',
          height: '32px',
        },
      };
    },
  },
};
