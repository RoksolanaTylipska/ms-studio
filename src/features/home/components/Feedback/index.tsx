import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import ReviewsSummary from "./components/ReviewsSummary";
import { useGoogleReviews } from "./hooks/useGoogleReviews";
import { FeedbackContainer, FormsContainer } from "./styled";
import { TitleStars } from "@/components";
import { Collapse } from "@mui/material";
import { useState } from "react";

function Feedback() {
  const googleReviews = useGoogleReviews();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <FeedbackContainer>
      <TitleStars title="feedback.title" filledStars={true} />
      <ReviewsSummary google={googleReviews} formOpen={formOpen} onToggleForm={() => setFormOpen(!formOpen)} />
      <Collapse in={formOpen}>
        <FormsContainer>
          <FeedbackForm />
        </FormsContainer>
      </Collapse>
      <FeedbackList googleReviews={googleReviews} />
    </FeedbackContainer>
  );
}

export default Feedback;
