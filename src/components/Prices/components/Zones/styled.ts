import { Box, Typography, styled } from "@mui/material";

export const DiscountBox = styled(Box)(({ theme }) => ({

  display: "flex",
  flexDirection: "row",
  paddingRight: "50px",
  gap: "30px",
  [theme.breakpoints.down("md")]: { 
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: { 
    padding: "0px",
  },
}));


export const Discounts = styled(Box)({
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
});

export const DiscountNumber = styled(Typography)(({ theme }) => ({
  fontFamily: "'Comfortaa', sans-serif",
  backgroundColor: theme.palette.colors.gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "35px",
  padding: "2px 8px",
  marginBottom: "5px",
  borderRadius: "50%",
}));

export const SessionsNumber = styled(Typography)({
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: "12px",
});

export const ZonesContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

export const ZoneTitle = styled(Typography)(({ theme }) => ({
  // color: theme.palette.colors.camel,
  fontSize: "18px",
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "250px",
  height: "25px",
  backgroundColor: theme.palette.colors.gold,
  borderRadius: "50px",
  [theme.breakpoints.down("md")]: { 
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: { 
    fontSize: "16px",
  },
}));

export const ZonePrice = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  [theme.breakpoints.down("md")]: { 
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: { 
    fontSize: "14px",
  },
}));

export const PricesBox = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  paddingRight: "50px",
  [theme.breakpoints.down("md")]: { 
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: { 
    padding: "0px",
  },
}));


export const LabelPriceContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
