import { Box, BoxProps, Button, ButtonProps, InputBase, Typography, alpha } from "@mui/material";

// Site palette (see src/styles/theme.ts)
export const adminColors = {
  beige: "#F1EAE5",
  caramel: "#E0D6D0",
  latte: "#7B7167",
  gold: "#D9C6A4",
  chocolate: "#35302D",
  camel: "#83694E",
  error: "#B3261E",
  success: "#2E7D4F",
};

export const bodyFont = "Comfortaa, sans-serif";
export const headingFont = "'Playfair Display SC', serif";

export const AdminCard = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      backgroundColor: "#fff",
      borderRadius: "24px",
      boxShadow: "0 10px 40px rgba(53, 48, 45, 0.08)",
      p: { xs: 2.5, sm: 4 },
      ...sx,
    }}
    {...props}
  />
);

export const PrimaryButton = ({ sx, ...props }: ButtonProps) => (
  <Button
    disableElevation
    sx={{
      backgroundColor: adminColors.chocolate,
      color: "#fff",
      borderRadius: "999px",
      px: 3,
      py: 1.25,
      fontFamily: bodyFont,
      fontSize: "14px",
      textTransform: "none",
      "&:hover": { backgroundColor: "#4a433f" },
      "&.Mui-disabled": { backgroundColor: adminColors.caramel, color: adminColors.latte },
      ...sx,
    }}
    {...props}
  />
);

export const GhostButton = ({ sx, ...props }: ButtonProps) => (
  <Button
    sx={{
      color: adminColors.chocolate,
      borderRadius: "999px",
      px: 2,
      fontFamily: bodyFont,
      fontSize: "13px",
      textTransform: "none",
      "&:hover": { backgroundColor: alpha(adminColors.gold, 0.3) },
      ...sx,
    }}
    {...props}
  />
);

export const IconAction = ({ sx, ...props }: ButtonProps) => (
  <Button
    sx={{
      minWidth: 0,
      width: 36,
      height: 36,
      borderRadius: "50%",
      color: adminColors.latte,
      "&:hover": { backgroundColor: alpha(adminColors.gold, 0.35), color: adminColors.chocolate },
      "&.Mui-disabled": { color: alpha(adminColors.latte, 0.3) },
      ...sx,
    }}
    {...props}
  />
);

const inputSx = (error: boolean) => ({
  px: 1.5,
  py: 0.5,
  borderRadius: "12px",
  border: `1px solid ${error ? adminColors.error : adminColors.caramel}`,
  backgroundColor: "#fff",
  fontFamily: bodyFont,
  fontSize: "15px",
  color: adminColors.chocolate,
  transition: "border-color .15s, box-shadow .15s",
  "&:hover": { borderColor: error ? adminColors.error : adminColors.gold },
  "&.Mui-focused": {
    borderColor: error ? adminColors.error : adminColors.camel,
    boxShadow: `0 0 0 3px ${alpha(error ? adminColors.error : adminColors.camel, 0.15)}`,
  },
});

export const FieldCaption = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontFamily: bodyFont, fontSize: "11px", color: adminColors.latte, mb: 0.5 }}>
    {children}
  </Typography>
);

export const PriceInput = ({
  label,
  ariaLabel,
  value,
  error,
  onChange,
}: {
  label: string;
  ariaLabel: string;
  value: string;
  error: boolean;
  onChange: (value: string) => void;
}) => (
  <Box sx={{ width: { xs: "calc(50% - 6px)", sm: 110 }, flexShrink: 0 }}>
    <FieldCaption>{label}</FieldCaption>
    <InputBase
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ inputMode: "numeric", "aria-label": ariaLabel, "aria-invalid": error }}
      endAdornment={
        <Typography sx={{ color: adminColors.latte, fontSize: "14px", ml: 0.5 }}>₴</Typography>
      }
      sx={inputSx(error)}
    />
  </Box>
);

export const TextInput = ({
  label,
  ariaLabel,
  value,
  error,
  onChange,
  type,
  placeholder,
  autoFocus,
}: {
  label?: string;
  ariaLabel: string;
  value: string;
  error?: boolean;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
}) => (
  <Box sx={{ flex: 1, minWidth: 0 }}>
    {label && <FieldCaption>{label}</FieldCaption>}
    <InputBase
      fullWidth
      type={type}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ "aria-label": ariaLabel, "aria-invalid": !!error }}
      sx={inputSx(!!error)}
    />
  </Box>
);
