export type Course = {
  link: string;
  title: string;
  subTitle?: string;
  duration: string;
  theory?: Record<string, CourseSection>;
  practice?: Record<string, CourseSection>;
  diploma?: CourseSection;
  note?: string;
  price?: string;
};

export type CourseSection = {
  title: string;
  description: string;
};
