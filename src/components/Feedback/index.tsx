import { useTranslation } from "react-i18next";

import TitleStars from "../TitleStars";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import { FeedbackContainer, FormsContainer } from "./styled";
import FeedbackList from "./components/FeedbackList/FeedbackList";

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
