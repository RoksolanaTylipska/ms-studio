import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import { formatDate } from "@/helpers/formatDate";
import useGetFirebaseDta from "@/hooks/useGetFirebaseDta";
import { useResponsive } from "@/hooks/useResponsive";
import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import useFilterFeedback from "../../hooks/useFilterFeedback";
import {
  FeedbackDate,
  FeedbackItem,
  FeedbackListContainer,
  ImageContainer,
  List,
} from "./styled";
import { Loader } from "@/components";

function FeedbackList() {
  const {
    data: feedbacks,
    loading,
    error,
  } = useGetFirebaseDta<Feedback>(FirebaseCollection.FEEDBACKS);
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const feedbacksFiltered = useFilterFeedback(feedbacks);

  if (loading) return <Loader />;
  if (error) return null;

  return (
    <FeedbackListContainer>
      {feedbacksFiltered.length !== 0 && (
        <List>
          {feedbacksFiltered.map((feedback) => (
            <FeedbackItem
              key={feedback.date}
              sx={{
                alignSelf: feedback.isEven
                  ? ("flex-start" as const)
                  : ("flex-end" as const),
              }}
            >
              <FeedbackDate>{formatDate(new Date(feedback.date))}</FeedbackDate>
              <ImageContainer>
                <Image
                  alt="Person"
                  src={`/assets/icons/persons/${feedback.randomPerson}.png`}
                  width={40}
                  height={40}
                />
                <Typography variant="bodyCaveat">
                  <strong>{feedback.name}</strong>
                </Typography>
                <Rating
                  value={Number(feedback.rating)}
                  readOnly
                  sx={{ fontSize: isMobile ? "12px" : "20px" }}
                />
              </ImageContainer>
              <Typography variant="body">
                <strong>{t("feedback.form.service")}:</strong>{" "}
                {feedback.service}
              </Typography>

              <Typography variant="body">
                {feedback.master && (
                  <>
                    <br />
                    <strong>{t("feedback.form.master")}:</strong>{" "}
                    {feedback.master}
                  </>
                )}
              </Typography>
              <br />
              <Typography variant="body">{feedback.feedback}</Typography>
            </FeedbackItem>
          ))}{" "}
        </List>
      )}
    </FeedbackListContainer>
  );
}

export default FeedbackList;
