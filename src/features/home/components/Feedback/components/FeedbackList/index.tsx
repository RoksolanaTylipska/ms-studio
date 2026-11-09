import { Loader } from "@/components";
import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import ReviewCard, { ReviewItem } from "@/features/home/components/Feedback/components/ReviewCard";
import GoogleIcon from "@/features/home/components/Feedback/components/ReviewCard/GoogleIcon";
import { FirebaseCollection } from "@/constants/firebase";
import { STUDIO } from "@/features/servicePages/seo";
import useGetFirebaseData from "@/hooks/useGetFirebaseData";
import type { GoogleReviews } from "@/lib/googleReviews";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useFilterFeedback from "../../hooks/useFilterFeedback";

// Two rows of three on a computer; the rest open with "show more"
const PAGE = 6;

const pill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  px: 4,
  py: 1.25,
  borderRadius: "999px",
  border: "1px solid #35302D",
  background: "none",
  cursor: "pointer",
  fontFamily: "Comfortaa, sans-serif",
  fontSize: "14px",
  letterSpacing: "normal",
  color: "#35302D",
  textDecoration: "none",
  "&:hover": { backgroundColor: "#fff" },
};

function FeedbackList({ googleReviews }: { googleReviews: GoogleReviews | null }) {
  const { data: feedbacks, loading, error } = useGetFirebaseData<Feedback>(FirebaseCollection.FEEDBACKS);
  const { t } = useTranslation();
  const [shown, setShown] = useState(PAGE);

  const siteReviews = useFilterFeedback(feedbacks);
  // Google reviews first: visitors trust them more than ones on the site itself
  const reviews = useMemo<ReviewItem[]>(
    () => [
      ...(googleReviews?.reviews ?? []).map((review) => ({
        name: review.author,
        phone: "",
        service: "",
        date: review.publishTime,
        rating: review.rating,
        feedback: review.text,
        photo: review.photo,
        authorUrl: review.authorUrl,
        url: review.url,
        fromGoogle: true,
      })),
      ...siteReviews,
    ],
    [googleReviews, siteReviews]
  );

  if (loading && reviews.length === 0) return <Loader />;
  if (error && reviews.length === 0) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: { xs: 2, md: 2.5 },
          // Every row as tall as the tallest card, so all cards match
          gridAutoRows: "1fr",
        }}
      >
        {reviews.slice(0, shown).map((review) => (
          <ReviewCard key={`${review.fromGoogle ? "g" : "s"}-${review.date}-${review.name}`} review={review} />
        ))}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, mt: 4 }}>
        {shown < reviews.length && (
          <Box component="button" type="button" onClick={() => setShown(shown + PAGE)} sx={pill}>
            {t("feedback.showMore")}
          </Box>
        )}
        {/* Google gives the site only a few reviews; all of them live on Google Maps */}
        {googleReviews && googleReviews.count > 0 && (
          <Box component="a" href={STUDIO.googleReviews} target="_blank" rel="noopener noreferrer" sx={pill}>
            <GoogleIcon size={16} />
            {t("feedback.allOnGoogle")} ({googleReviews.count}) →
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FeedbackList;
