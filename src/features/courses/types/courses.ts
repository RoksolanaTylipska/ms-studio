export type Course = {
  title: string;
  backgroundColor: "light" | "dark";
  variants: Variant[];
};

export type Variant = {
  title: string;
  duration?: string; 
  img: string;
  link?: string

};
