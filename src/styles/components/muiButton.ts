import { Components, alpha } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    main: true;
    secondary: true;
    error: true;
  }
}

export const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  variants: [
    {
      props: { variant: 'main' },
      style: ({ theme, ownerState }: any) => {
        const commonStyles = {
          ':disabled': {
            color: '#D0D5DD',
            background: '#F2F4F7',
            whiteSpace: 'nowrap',
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
              background: alpha(theme.palette.primary.p25, 0.7),
            },
          };
        }
        if (ownerState.color === 'error') {
          return {
            ...commonStyles,
            background: '#FFF0F0',
            color: '#C90303',
            svg: {
              color: '#FC5454',
            },
            ':hover': {
              background: '#FFF0F0',
              color: '#C90303',
              svg: {
                color: '#FC5454',
              },
            },
          };
        }
        if (ownerState.color === 'warning') {
          return {
            ...commonStyles,
            background: '#FFF5EB',
            color: '#A85A00',
            svg: {
              color: '#FF961B',
            },
            ':hover': {
              background: '#FFF5EB',
              color: '#A85A00',
              svg: {
                color: '#FF961B',
              },
            },
          };
        }
        if (ownerState.color === 'success') {
          return {
            ...commonStyles,
            background: '#F0FDE8',
            color: '#42940F',
            svg: {
              color: '#73E92B',
            },
            ':hover': {
              background: '#F0FDE8',
              color: '#42940F',
              svg: {
                color: '#73E92B',
              },
            },
          };
        }
      },
    },
    {
      props: { variant: 'secondary' },
      style: ({ theme, ownerState }: any) => {
        const commonStyles = {
          background: 'transparent',
          whiteSpace: 'nowrap',
        };

        if (ownerState.color === 'primary') {
          return {
            ...commonStyles,
            color: theme.colors.new.grey.p400,
            border: `1.5px solid ${theme.palette.primary.p300}`,
            svg: {
              color: theme.palette.primary.p500,
            },
            ':disabled': {
              color: theme.palette.primary.p100,
              background: alpha(theme.palette.primary.p25, 0.7),
              border: `1px solid ${theme.palette.primary.p100}`,
            },
            ':hover': {
              background: theme.palette.primary.p100,
            },
          };
        }
        if (ownerState.color === 'error') {
          return {
            ...commonStyles,
            color: '#C90303',
            border: '1.5px solid #FEDCDC',
            svg: {
              color: '#FC5454',
            },
            ':hover': {
              color: '#C90303',
              borderColor: '#FEDCDC',
              svg: {
                color: '#FC5454',
              },
            },
          };
        }
        if (ownerState.color === 'warning') {
          return {
            ...commonStyles,
            color: '#A85A00',
            border: '1.5px solid #FFEAD1',
            svg: {
              color: '#FC5454',
            },
            ':hover': {
              color: '#A85A00',
              borderColor: '#FFEAD1',
              svg: {
                color: '#FF961B',
              },
            },
          };
        }
        if (ownerState.color === 'success') {
          return {
            ...commonStyles,
            color: '#42940F',
            border: '1.5px solid #E4FBD5',
            svg: {
              color: '#73E92B',
            },
            ':hover': {
              color: '#42940F',
              borderColor: '#E4FBD5',
              svg: {
                color: '#73E92B',
              },
            },
          };
        }
      },
    },
    {
      props: { variant: 'error' },
      style: {
        minHeight: '36px',
        boxShadow: '0px 2px 6px 0px #0000001A',
        border: '1px solid #FC5454',
        color: '#FC5454',
        borderRadius: '26px',
        padding: '10px 26px',
        ':disabled': {
          color: '#D0D5DD',
          background: '#F2F4F7',
        },
        ':hover': {
          background: '#FC5454',
          color: '#FFFFFF',
        },
      },
    },
  ],
  styleOverrides: {
    root: () => {
      const commonStyles = {
        height: '40px',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        '.MuiButton-endIcon': {
          marginLeft: '8px',
          marginRight: '0px',
        },
        '.MuiButton-startIcon': {
          marginRight: '8px',
          marginLeft: '0px',
        },
        svg: {
          width: '18px',
          height: '18px',
        },
      };
      return commonStyles;
    },
    sizeSmall: () => {
      return {
        height: '32px',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        '.MuiButton-endIcon': {
          marginLeft: '4px',
          marginRight: '0px',
        },
        '.MuiButton-startIcon': {
          marginRight: '4px',
          marginLeft: '0px',
        },
        svg: {
          width: '18px',
          height: '18px',
        },
      };
    },
    sizeLarge: () => {
      return {
        height: '56px',
        padding: '12px 24px',
        borderRadius: '16px',
        fontSize: '18px',
        fontWeight: 600,
        '.MuiButton-endIcon': {
          marginLeft: '12px',
          marginRight: '0px',
        },
        '.MuiButton-startIcon': {
          marginRight: '12px',
          marginLeft: '0px',
        },
        svg: {
          width: '29px',
          height: '29px',
        },
      };
    },
  },
};
