import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import { Box, Dialog, Rating, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import GoogleIcon from "./GoogleIcon";

export type ReviewItem = Feedback & {
  photo?: string | null;
  authorUrl?: string | null;
  url?: string | null;
  fromGoogle?: boolean;
};

const BODY_FONT = "Comfortaa, sans-serif";
const CHOCOLATE = "#35302D";
const LATTE = "#7B7167";
// Longer texts fold to this many lines; "read more" opens the whole review
const CLAMP_LINES = 5;

const formatDay = (date: string, language: string) =>
  new Intl.DateTimeFormat(language === "en" ? "en-GB" : "uk-UA", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date)
  );

const Avatar = ({ name, photo }: { name: string; photo?: string | null }) =>
  photo ? (
    <Box
      component="img"
      alt=""
      src={photo}
      referrerPolicy="no-referrer"
      loading="lazy"
      sx={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
    />
  ) : (
    <Box
      aria-hidden
      sx={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        backgroundColor: "#E0D6D0",
        color: CHOCOLATE,
        fontFamily: BODY_FONT,
        fontSize: "18px",
      }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </Box>
  );

const textSx = { fontFamily: BODY_FONT, fontSize: "14px", lineHeight: 1.65, whiteSpace: "pre-line" } as const;

// Everything a review shows; the card folds the text, the window shows it whole
const ReviewContent = ({ review, folded, onMore }: { review: ReviewItem; folded: boolean; onMore?: () => void }) => {
  const { t, i18n } = useTranslation();
  // Whether the folded text hides anything, so "read more" only shows when needed
  const [long, setLong] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (el && folded) setLong(el.scrollHeight > el.clientHeight + 1);
  }, [review.feedback, folded]);

  const name = review.authorUrl ? (
    <Box component="a" href={review.authorUrl} target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", font: "inherit", letterSpacing: "inherit", textDecoration: "none" }}>
      {review.name}
    </Box>
  ) : (
    review.name
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar name={review.name} photo={review.photo} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "15px", fontWeight: 700, lineHeight: 1.3 }}>
            {name}
          </Typography>
          <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "12px", color: LATTE }}>
            {formatDay(review.date, i18n.language)}
          </Typography>
        </Box>
      </Box>

      <Rating value={Number(review.rating) || 5} readOnly size="small" />

      {(review.service || review.master) && (
        <Typography variant="inherit" sx={{ fontFamily: BODY_FONT, fontSize: "12px", color: LATTE, lineHeight: 1.6 }}>
          {[review.service, review.master].filter(Boolean).join(" · ")}
        </Typography>
      )}

      {review.feedback && (
        <Box>
          <Typography
            ref={textRef}
            variant="inherit"
            sx={{
              ...textSx,
              ...(folded && { display: "-webkit-box", WebkitLineClamp: CLAMP_LINES, WebkitBoxOrient: "vertical", overflow: "hidden" }),
            }}
          >
            {review.feedback}
          </Typography>
          {folded && long && (
            <Box
              component="button"
              type="button"
              onClick={onMore}
              sx={{ mt: 0.5, p: 0, border: 0, background: "none", cursor: "pointer", fontFamily: BODY_FONT, fontSize: "13px", color: "#83694E", "&:hover": { textDecoration: "underline" } }}
            >
              {t("feedback.readMore")}
            </Box>
          )}
        </Box>
      )}

      {review.fromGoogle && (
        <Box
          component={review.url ? "a" : "div"}
          {...(review.url && { href: review.url, target: "_blank", rel: "noopener noreferrer" })}
          sx={{ mt: "auto", pt: 1.5, borderTop: "1px solid #F1EAE5", display: "flex", alignItems: "center", gap: 1, color: LATTE, textDecoration: "none", fontFamily: BODY_FONT, fontSize: "12px", letterSpacing: "normal" }}
        >
          <GoogleIcon size={16} />
          {t("feedback.viewOnGoogle")}
        </Box>
      )}
    </>
  );
};

const ReviewCard = ({ review }: { review: ReviewItem }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="article"
        sx={{
          height: "100%",
          boxSizing: "border-box",
          p: { xs: 2.5, md: 3 },
          borderRadius: "16px",
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(53, 48, 45, 0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          fontFamily: BODY_FONT,
          color: CHOCOLATE,
        }}
      >
        <ReviewContent review={review} folded onMore={() => setOpen(true)} />
      </Box>

      {/* The whole review, so the cards in the grid keep one height */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { position: "relative", borderRadius: "20px", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", gap: 1.5, color: CHOCOLATE },
        }}
      >
        <Box
          component="button"
          type="button"
          aria-label={t("feedback.close")}
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, border: 0, borderRadius: "50%", background: "none", cursor: "pointer", fontSize: "22px", lineHeight: 1, color: LATTE, "&:hover": { backgroundColor: "#F1EAE5" } }}
        >
          ×
        </Box>
        <ReviewContent review={review} folded={false} />
      </Dialog>
    </>
  );
};

export default ReviewCard;
