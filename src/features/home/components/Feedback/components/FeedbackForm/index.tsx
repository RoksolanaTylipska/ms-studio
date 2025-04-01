import i18n from "@/I18n/i18nConfig";
import { Button, InputField, InputPhone, SelectField } from "@/components";
import { feedbackServiсes } from "@/features/home/components/Feedback/constants/feedbackServiсes";
import { feedbackSources } from "@/features/home/components/Feedback/constants/feedbackSources";
import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import { Master } from "@/features/home/types/masters";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import { MessageType } from "@/helpers/getMessages";
import useGetFirebaseDta from "@/hooks/useGetFirebaseDta";
import { useSendTelegramMessage } from "@/hooks/useSendTelegramMessage";
import { Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, RatingContainer } from "./styled";

function FeedbackForm() {
  const { t } = useTranslation();
  const { data: masters } = useGetFirebaseDta<Master>(
    FirebaseCollection.MASTERS
  );
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_FEEDBACK_chatId;
  const token = process.env.NEXT_PUBLIC_TELEGRAM_FEEDBACK_token;

  const { success, setSuccess, loading, onSubmit } = useSendTelegramMessage({
    chatId,
    token,
    firebaseCollection: FirebaseCollection.FEEDBACKS,
    messageType: MessageType.FEEDBACK,
  });
  const selectedLanguage = i18n.language;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Feedback>({
    defaultValues: {
      name: "",
      rating: 5,
      phone: "",
      feedback: "",
      service: "",
      source: "",
      date: "",
      master: "",
    },
  });

  const excludedIds = ["Kril", "Semak"];

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
      toast.success("Дякуємо за відгук!", {
        position: "bottom-right",
        autoClose: 4000,
        icon: false,
        style: {
          background: "#fff",
          color: "#35302D",
          fontSize: "16px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          fontFamily: "Comfortaa, sans-serif",
        },
      });

      reset();
      setSuccess(false);
    }
  }, [success, reset, setSuccess]);

  return (
    <>
      <Form>
        <InputPhone
          name="phone"
          control={control}
          errors={errors}
          label={t("modalWindow.input.phone_label")}
          required
        />

        <InputField
          name="name"
          control={control}
          errors={errors}
          rules={{ required: t("feedback.form.name") }}
          label={t("feedback.form.name_label")}
          required
        />

        <SelectField
          name="service"
          control={control}
          errors={errors}
          rules={{ required: t("feedback.form.service_label") }}
          label={t("feedback.form.service_label")}
          options={getTranslatedOptions(feedbackServiсes)}
          required
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <RatingContainer>
              <Typography>{t("feedback.star")}</Typography>
              <Rating
                {...field}
                value={Number(field.value)}
                onChange={(_, value) => field.onChange(value)}
              />
            </RatingContainer>
          )}
        />

        <SelectField
          name="source"
          control={control}
          errors={errors}
          label={t("feedback.form.source_label")}
          options={feedbackSources.map(({ value, label }) => ({
            value,
            label: t(label),
          }))}
        />

        <SelectField
          name="master"
          control={control}
          errors={errors}
          label={t("feedback.form.master_label")}
          options={masterOptions}
        />

        <InputField
          name="feedback"
          control={control}
          errors={errors}
          label={t("feedback.form.experience_label")}
          multiline
          minRows={4}
        />

        <Button
          children={t("feedback.submit")}
          onClick={handleSubmit(onSubmit)}
          type="primary"
          color="dark"
          size="medium"
        />
      </Form>
      <ToastContainer position="top-center" autoClose={4000} />
    </>
  );
}

export default FeedbackForm;
