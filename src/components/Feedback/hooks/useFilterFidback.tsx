import { Feedback } from "@/types/feedback";
import { useMemo } from "react";

const useFilterFeedback = (feedbacks: Feedback[]) => {
  return useMemo(() => {
    return feedbacks
      .map((feedback, index) => ({
        ...feedback,
        randomPerson: Math.floor(Math.random() * 13) + 1,
        isEven: index % 2 === 0,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [feedbacks]);
};

export default useFilterFeedback;
