import GoogleIcon from "@/features/home/components/Feedback/components/ReviewCard/GoogleIcon";
import { STUDIO } from "@/features/servicePages/seo";
import type { GoogleReviews } from "@/lib/googleReviews";
import { Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const BODY_FONT = "Comfortaa, sans-serif";
const CHOCOLATE = "#35302D";

const pill = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  px: { xs: 2, sm: 3 },
  py: 1.25,
  borderRadius: "999px",
  border: `1px solid ${CHOCOLATE}`,
  cursor: "pointer",
  fontFamily: BODY_FONT,
  fontSize: { xs: "13px", sm: "14px" },
  letterSpacing: "normal",
  whiteSpace: "nowrap",
  textDecoration: "none",
  transition: "background-color .2s, color .2s",
};

// Google rating of the studio and the two ways to leave a review
const ReviewsSummary = ({
  google,
  formOpen,
  onToggleForm,
}: {
  google: GoogleReviews | null;
  formOpen: boolean;
  onToggleForm: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const hasRating = Boolean(google && google.count > 0);
  const rating = google
    ? new Intl.NumberFormat(i18n.language === "en" ? "en" : "uk", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(google.rating)
    : "";

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 6 },
        mb: { xs: 3, md: 4 },
        p: { xs: 3, md: "28px 36px" },
        borderRadius: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 8px 24px rgba(53, 48, 45, 0.06)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: hasRating ? "space-between" : "center",
        gap: 3,
        fontFamily: BODY_FONT,
        color: CHOCOLATE,
      }}
    >
      {hasRating && google && (
        <Box
          component="a"
          href={STUDIO.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "flex", alignItems: "center", gap: 2, color: "inherit", textDecoration: "none", letterSpacing: "normal" }}
        >
          <GoogleIcon size={40} />
          <Box>
            <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "13px", color: "#7B7167" }}>
              {t("feedback.googleRating")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "30px", fontWeight: 700, lineHeight: 1.2 }}>
                {rating}
              </Typography>
              <Rating value={google.rating} precision={0.1} readOnly />
            </Box>
            <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "13px", color: "#7B7167" }}>
              {t("feedback.reviewsCount", { count: google.count })}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, width: { xs: "100%", sm: "auto" } }}>
        {google?.writeUrl && (
          <Box
            component="a"
            href={google.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...pill, color: CHOCOLATE, "&:hover": { backgroundColor: "#F1EAE5" } }}
          >
            <GoogleIcon size={16} />
            {t("feedback.writeGoogle")}
          </Box>
        )}
        <Box
          component="button"
          type="button"
          aria-expanded={formOpen}
          onClick={onToggleForm}
          sx={{ ...pill, backgroundColor: CHOCOLATE, color: "#F1EAE5", "&:hover": { backgroundColor: "#4a433f" } }}
        >
          {formOpen ? t("feedback.hideForm") : t("feedback.writeSite")}
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewsSummary;
