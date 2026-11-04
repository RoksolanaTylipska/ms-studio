import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import { FeedbackContainer, FormsContainer } from "./styled";
import { TitleStars } from "@/components";

function Feedback() {

  return (
    <FeedbackContainer>
      <TitleStars title="feedback.title" filledStars={true} />
      <FormsContainer>
        <FeedbackForm />
        <FeedbackList />
      </FormsContainer>
    </FeedbackContainer>
  );
}

export default Feedback;
