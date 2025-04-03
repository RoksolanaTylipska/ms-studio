import { Button, InputField, InputPhone, SelectField } from "@/components";
import { feedbackSources } from "@/features/home/components/Feedback/constants/feedbackSources";
import { Feedback } from "@/features/home/components/Feedback/types/feedback";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import { MessageType } from "@/helpers/getMessages";
import { useSendTelegramMessage } from "@/hooks/useSendTelegramMessage";
import { Rating, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import { Form, RatingContainer } from "./styled";
import { feedbackServices } from "../../constants/feedbackServices";

const chatId = process.env.NEXT_PUBLIC_TELEGRAM_FEEDBACK_chatId;
const token = process.env.NEXT_PUBLIC_TELEGRAM_FEEDBACK_token;

function FeedbackForm() {
  const { t } = useTranslation();

  const { success, setSuccess, onSubmit, error } = useSendTelegramMessage({
    chatId,
    token,
    firebaseCollection: FirebaseCollection.FEEDBACKS,
    messageType: MessageType.FEEDBACK,
  });

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

  const { masterOptions, getTranslatedOptions } = useFeedbackForm({
    success,
    setSuccess,
    error,
    reset,
  });

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
          options={getTranslatedOptions(feedbackServices)}
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
