import i18n from "@/I18n/i18nConfig";
import { Master } from "@/features/home/components/Masters/types/masters";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import { showToast } from "@/helpers/showToast";
import useGetFirebaseDta from "@/hooks/useGetFirebaseDta";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface useFeedbackFormProps {
  success: boolean;
  setSuccess: (value: boolean) => void;
  error: string | null;
  reset: () => void;
}

const excludedIds = ["Kril", "Semak"];

const useFeedbackForm = ({
  success,
  setSuccess,
  error,
  reset,
}: useFeedbackFormProps) => {
  const selectedLanguage = i18n.language;
  const { t } = useTranslation();
  const { data: masters } = useGetFirebaseDta<Master>(
    FirebaseCollection.MASTERS
  );

  const getTranslatedOptions = (items: { value: string; label: string }[]) =>
    items.map(({ value, label }) => ({
      value,
      label: t(label),
    }));

  const masterOptions =
    masters
      ?.filter(({ id }) => !excludedIds.includes(id))
      .map(({ name }) => {
        const translated = name[selectedLanguage];
        return { value: translated, label: translated };
      }) || [];

  useEffect(() => {
    if (success) {
      showToast("success", t("feedback.form.success"));
      reset();
      setSuccess(false);
    }
    if (error) {
      showToast("error", t("feedback.form.error"));
      setSuccess(false);
    }
  }, [success, reset, setSuccess]);

  return {
    masterOptions,
    getTranslatedOptions,
  };
};

export default useFeedbackForm;
