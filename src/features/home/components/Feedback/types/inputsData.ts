export interface AppointmentData {
  name: string;
  phone: string;
}

interface FeedbackExtraFields {
  rating?: number;
  feedback?: string;
  service: string;
  source?: string;
  date?: string;
  master?: string;
}

export type FeedbackData = AppointmentData & FeedbackExtraFields;

export type InputData = AppointmentData | FeedbackData;
