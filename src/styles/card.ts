// One card look for the whole site: flat, rounded, and coloured from the
// palette as the opposite tone of the section it sits on (caramel on beige,
// beige on caramel) instead of white with a shadow.
export const CARD_RADIUS = "24px";

export const cardColors = {
  beige: "#F1EAE5",
  caramel: "#E0D6D0",
};

export const card = (backgroundColor: string) => ({
  backgroundColor,
  borderRadius: CARD_RADIUS,
});

// Clickable cards lift a little on hover
export const cardHover = {
  transition: "transform .25s, box-shadow .25s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 44px rgba(53, 48, 45, 0.12)",
  },
};
