import { useTranslation } from "react-i18next";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import { FeedbackContainer, FormsContainer } from "./styled";
import { TitleStars } from "@/components";

function Feedback() {
  const { t } = useTranslation();

  return (
    <FeedbackContainer>
      <TitleStars title={t("feedback.title")} filledStars={true} />
      <FormsContainer>
        <FeedbackForm />
        <FeedbackList />
      </FormsContainer>
    </FeedbackContainer>
  );
}

export default Feedback;
