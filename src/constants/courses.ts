import { Course } from "@/types/courses";

export const courses: Course[] = [
  {
    title: "services.electroepilation",
    backgroundColor: "light",
    variants: [
      {
        title: "courses.variants.electroepilation.base",
        duration: "courses.variants.days.three",
        img: "/assets/photos/general/photo-7.webp",
        link: "/electroepilation-basic-course",
      },
      {
        title: "courses.variants.electroepilation.deep",
        duration: "courses.variants.days.five",
        img: "/assets/photos/general/photo-9.webp",
        link: "/electroepilation-advanced-course",
      },
      {
        title: "courses.variants.electroepilation.qualification",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-8.webp",
        link: "/electroepilation-qualification-course",
      },
      {
        title: "courses.variants.electroepilation.online",
        img: "/assets/photos/general/photo-4.webp",
        link: "/online-consultation",

      },
    ],
  },
  {
    title: "services.lazer",
    backgroundColor: "dark",
    variants: [
      {
        title: "courses.variants.laser.base",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-6.webp",
        link: "/laser-basic-course",
      },
      {
        title: "courses.variants.laser.deep",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-5.webp",
        link: "/laser-advanced-course",
      },
      {
        title: "courses.variants.laser.men",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-3.webp",
        link: "/laser-mens-depilation",
      },
      {
        title: "courses.variants.laser.online",
        img: "/assets/photos/general/photo-4.webp",
        link: "/online-consultation",
      },
    ],
  },
  {
    title: "services.waxing",
    backgroundColor: "light",
    variants: [
      {
        title: "courses.variants.waxing.base",
        duration: "courses.variants.days.one",
        img: "/assets/photos/benefits/specialization.webp",
        link: "/waxing-base-course",
      },
      {
        title: "courses.variants.waxing.master",
        duration: "courses.variants.days.two",
        img: "/assets/photos/benefits/professionalism.webp",
        link: "/waxing-advanced-course",
      },
      {
        title: "courses.variants.waxing.bikini",
        duration: "courses.variants.days.one",
        img: "/assets/photos/carousel_1-mobile.webp",
        // link: "/waxing-perfect-bikini",
      },
      {
        title: "courses.variants.waxing.face",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-1.webp",
        // link: "/waxing-face-depilation",
      },
      {
        title: "courses.variants.waxing.men",
        duration: "courses.variants.days.one",
        img: "/assets/photos/general/photo-2.webp",
        link: "/waxing-mens-depilation",
      },
    ],
  },
];
