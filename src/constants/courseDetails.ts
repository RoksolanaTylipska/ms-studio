import { Course } from "@/types/courseDetails";

export const courseDetails: Course[] = [
  {
    link: "electroepilation-basic-course",
    title: "services.electroepilation",
    subTitle: "courses.variants.electroepilation.base",
    duration: "courses.variants.days.three",
    theory: {
      "day1": {
        title: "courses.electroepilation_base.theory.day1.title",
        description: "courses.electroepilation_base.theory.day1.topics",
      }
    },
    practice: {
      "day1": {
        title: "courses.electroepilation_base.practice.day1.title",
        description: "courses.electroepilation_base.practice.day1.topics",
      },
      "day2": {
        title: "courses.electroepilation_base.practice.day2.title",
        description: "courses.electroepilation_base.practice.day2.topics",
      },
      "day3": {
        title: "courses.electroepilation_base.practice.day3.title",
        description: "courses.electroepilation_base.practice.day3.topics",
      }
    },
    diploma: {
      title: "courses.electroepilation_base.diploma.title",
      description: "courses.electroepilation_base.diploma.topics"
    }
  },
  {
    link: "electroepilation-advanced-course",
    title: "services.electroepilation",
    subTitle: "courses.variants.electroepilation.deep",
    duration: "courses.variants.days.three",
    theory: {
      "day1": {
        title: "courses.electroepilation_advance.theory.day1.title",
        description: "courses.electroepilation_advance.theory.day1.topics",
      },
      "day2": {
        title: "courses.electroepilation_advance.theory.day2.title",
        description: "courses.electroepilation_advance.theory.day2.topics",
      },
      "day3": {
        title: "courses.electroepilation_advance.theory.day3.title",
        description: "courses.electroepilation_advance.theory.day3.topics",
      },
    },
    practice: {
      "day1": {
        title: "courses.electroepilation_advance.practice.day1.title",
        description: "courses.electroepilation_advance.practice.day1.topics",
      },
      "day2": {
        title: "courses.electroepilation_advance.practice.day2.title",
        description: "courses.electroepilation_advance.practice.day2.topics",
      },
      "day3": {
        title: "courses.electroepilation_advance.practice.day3.title",
        description: "courses.electroepilation_advance.practice.day3.topics",
      },
    }
    

  },
  {
    link: "electroepilation-qualification-course",
    title: "services.electroepilation",
    subTitle: "courses.variants.electroepilation.qualification",
    duration: "courses.variants.days.one-two",
    theory: {
      "day1": {
        title: "courses.electroepilation_qualification.theory.day1.title",
        description: "courses.electroepilation_qualification.theory.day1.topics",
      },
      "day2": {
        title: "courses.electroepilation_qualification.theory.day2.title",
        description: "courses.electroepilation_qualification.theory.day2.topics",
      }
    },
    practice: {
      "day1": {
        title: "courses.electroepilation_qualification.practice.day1.title",
        description: "courses.electroepilation_qualification.practice.day1.topics",
      },
      "day2": {
        title: "courses.electroepilation_qualification.practice.day2.title",
        description: "courses.electroepilation_qualification.practice.day2.topics",
      }
    },
    diploma: {
      title: "courses.electroepilation_qualification.diploma.title",
      description: "courses.electroepilation_qualification.diploma.topics"
    }
  }
];
