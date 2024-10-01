import { Components, alpha } from '@mui/material';

//TODO vlad change hardcode to theme colors
export const MuiTextField: Components['MuiTextField'] = {
  styleOverrides: {
    root: ({ theme, ownerState }: any) => {
      const labelTransform = ownerState?.InputProps?.startAdornment
        ? '48px'
        : '17px';

      const size = ownerState.size === 'small' ? '40px' : '56px';
      const labelTransformY = ownerState.size === 'small' ? '10px' : '18px';
      const labelTransformYFocused =
        ownerState.size === 'small' ? '4px' : '8px';
      const paddingTop = ownerState.label
        ? ownerState.size === 'small'
          ? '24px'
          : '36px'
        : '0px';
      const paddingBottom = ownerState.label
        ? ownerState.size === 'small'
          ? '18px'
          : '24px'
        : '0px';

      const inputHeight = ownerState.size === 'small' ? '18px' : '24px';

      return {
        input: {
          color: theme.colors.new.dark.p100,

          height: inputHeight,
          paddingLeft: '0',
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
        },
        textarea: {
          paddingTop: '16px',
          '&.Mui-disabled': {},
        },
        '.MuiInputAdornment-positionStart': {
          marginTop: '0 !important',
        },
        '.MuiInputAdornment-positionEnd': {
          cursor: 'pointer',
          stroke: '#344054',
          fill: '#344054',
          '&.Mui-success': { stroke: '#42940F' },
          '&.Mui-error': { stroke: '#C90303' },
          '&.Mui-warning': { stroke: '#A85A00' },
        },
        '.MuiFormHelperText-root': {
          margin: 0,
          fontSize: '10px',
          lineHeight: '16px',
          color: '#051F1C',
          '&.Mui-success': { color: '#42940F' },
          '&.Mui-error': { color: '#C90303' },
          '&.Mui-warning': { color: '#A85A00' },
        },
        '.MuiInputLabel-root': {
          color: '#667085',
          transform: `translate(${labelTransform}, ${
            ownerState.value ? labelTransformYFocused : labelTransformY
          })`,
          fontSize: ownerState.value && '10px',

          '&.Mui-focused': {
            transform: `translate(${labelTransform}, ${labelTransformYFocused})`,
            fontSize: '10px',
            color: '#667085',
            '&.Mui-success': { color: '#42940F' },
            '&.Mui-error': { color: '#C90303' },
            '&.Mui-warning': { color: '#A85A00' },
          },
          '&.Mui-success': { color: '#42940F' },
          '&.Mui-warning': { color: '#A85A00' },
        },
        '.MuiFormLabel-filled, .MuiInputLabel-roo': {
          transform: `translate(${labelTransform}, ${labelTransformYFocused})`,
          fontSize: '10px',
          '&.Mui-disabled': {
            color: alpha(theme.colors.new.dark.p100, 0.38),
          },
        },
        '.MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: alpha(theme.colors.new.dark.p100, 0.38),
        },
        '.MuiInputBase-root': {
          border: '1px solid #D0D5DD',
          borderRadius: '8px',
          background: theme.colors.new.white.p400,

          padding: '8px 16px',
          height: size,
          color: theme.colors.new.dark.p100,
          '&:hover': {
            border: `1px solid ${theme.palette.primary.p500}`,
            background: theme.colors.new.white.p400,
          },
          '&.Mui-focused': {
            background: theme.colors.new.white.p400,
            borderColor: theme.palette.primary.p500,
          },
          '&.Mui-error': {
            background: theme.colors.new.white.p400,
            borderColor: '#C90303',
          },
          '&.Mui-success': {
            borderColor: '#42940F',
            background: '#F0FDE8',
          },
          '&.Mui-warning': {
            background: '#FFF5EB',
            borderColor: '#A85A00',
          },
          '&.MuiFilledInput-root': {
            '&.Mui-disabled': {
              background: alpha(theme.colors.new.white.p400, 0.38),

              border: `1px solid ${alpha('#D0D5DD', 0.5)}`,
            },
          },
          '&.Mui-disabled': {
            background: alpha(theme.colors.new.white.p400, 0.5),
            border: `1px solid ${alpha('#D0D5DD', 0.5)}`,
          },
          '.MuiSelect-select': {
            padding: '0px',
          },
          fieldset: {
            border: 'none',
          },
        },
        borderRadius: '8px',
        '&.Mui-error': {
          background: theme.colors.new.white.p400,
          borderColor: '#C90303',
        },
        '&.Mui-success': {
          borderColor: '#42940F',
          background: '#F0FDE8',
        },
      };
    },
  },
};
