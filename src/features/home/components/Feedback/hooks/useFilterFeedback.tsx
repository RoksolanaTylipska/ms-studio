import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import { useMemo } from "react";

// Newest first
const useFilterFeedback = <T extends Feedback>(feedbacks: T[]) =>
  useMemo(() => [...feedbacks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [feedbacks]);

export default useFilterFeedback;
