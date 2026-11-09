import { Loader } from "@/components";
import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import ReviewCard, { ReviewItem } from "@/features/home/components/Feedback/components/ReviewCard";
import GoogleIcon from "@/features/home/components/Feedback/components/ReviewCard/GoogleIcon";
import { FirebaseCollection } from "@/constants/firebase";
import { STUDIO } from "@/features/servicePages/seo";
import useGetFirebaseData from "@/hooks/useGetFirebaseData";
import type { GoogleReviews } from "@/lib/googleReviews";
import { Box } from "@mui/material";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import useFilterFeedback from "../../hooks/useFilterFeedback";

const GAP = 20;

// Round arrow above the reviews that scrolls them by one screen
const ArrowButton = ({ dir, label, onClick }: { dir: -1 | 1; label: string; onClick: () => void }) => (
  <Box
    component="button"
    type="button"
    aria-label={label}
    onClick={onClick}
    sx={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "1px solid #35302D",
      background: "none",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      color: "#35302D",
      "&:hover": { backgroundColor: "#fff" },
    }}
  >
    <svg width="10" height="16" viewBox="0 0 12 20" fill="none" aria-hidden>
      <path d={dir < 0 ? "M10 2 2 10l8 8" : "M2 2l8 8-8 8"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);

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
  const trackRef = useRef<HTMLDivElement>(null);

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

  // One screen of cards per arrow press
  const scroll = (dir: -1 | 1) => trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth, behavior: "smooth" });

  return (
    <Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "flex-end", gap: 1.5, mb: 2 }}>
        <ArrowButton dir={-1} label={t("feedback.prev")} onClick={() => scroll(-1)} />
        <ArrowButton dir={1} label={t("feedback.next")} onClick={() => scroll(1)} />
      </Box>
      <Box
        ref={trackRef}
        sx={{
          // Columns of cards that scroll sideways: two rows on a computer, one on a phone
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gridAutoColumns: { xs: "85%", sm: `calc((100% - ${GAP}px) / 2)`, md: `calc((100% - ${2 * GAP}px) / 3)` },
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          // Phones: the row runs to the screen edges past the section padding
          mx: { xs: "-30px", sm: 0 },
          px: { xs: "30px", sm: 0 },
          scrollPaddingInline: { xs: "30px", sm: 0 },
          py: 1,
        }}
      >
        {reviews.map((review) => (
          <Box key={`${review.fromGoogle ? "g" : "s"}-${review.date}-${review.name}`} sx={{ scrollSnapAlign: "start", minWidth: 0 }}>
            <ReviewCard review={review} />
          </Box>
        ))}
      </Box>
      {/* Google gives the site only a few reviews; all of them live on Google Maps */}
      {googleReviews && googleReviews.count > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Box component="a" href={STUDIO.googleReviews} target="_blank" rel="noopener noreferrer" sx={pill}>
            <GoogleIcon size={16} />
            {t("feedback.allOnGoogle")} ({googleReviews.count}) →
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default FeedbackList;
