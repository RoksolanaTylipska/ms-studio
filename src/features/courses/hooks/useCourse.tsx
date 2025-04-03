import { useRouter } from "next/router";

interface UseCourseProps {
  handleModalWindow: () => void;
}

export const useCourse = ({ handleModalWindow }: UseCourseProps) => {
  const router = useRouter();

  const handleMoreDetails = (link: string) => {
    if (link) {
      router.push(`/courses/${link}`);
      return;
    }
    handleModalWindow();
  };
  return { handleMoreDetails };
};
