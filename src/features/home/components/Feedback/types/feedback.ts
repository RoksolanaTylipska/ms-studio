export type Feedback = Required<
  Pick<FeedbackBase, "name" | "phone" | "service" | "date">
> &
  Partial<Omit<FeedbackBase, "name" | "phone" | "service | date">>;

type FeedbackBase = {
  name: string;
  phone: string;
  rating: number;
  feedback: string;
  service: string;
  source: string;
  date: string;
  master: string;
};
