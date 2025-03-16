import i18n from "@/I18n/i18nConfig";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputPhone from "@/components/InputPhone";
import SelectField from "@/components/SelectField/SelectField";
import { feedbackServiсes } from "@/constants/feedbackServiсes";
import { feedbackSources } from "@/constants/feedbackSources";
import { formatDate } from "@/helpers/formatDate";
import useAddFirebaseData from "@/hooks/useAddFirebaseData";
import useGetFirebaseDta from "@/hooks/useGetFirebaseDta";
import { Rating, Typography } from "@mui/material";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form, RatingContainer } from "./styled";
import { Feedback } from "@/types/feedback";

function FeedbackForm() {
  const { t } = useTranslation();
  const { addDocument } = useAddFirebaseData();
  const { data: masters } = useGetFirebaseDta("masters");

  const selectedLanguage = useMemo(() => {
    if (typeof window !== "undefined") {
      return i18n.language || window.localStorage.i18n;
    }
    return i18n.language;
  }, [i18n.language]);

  const {
    control,
    handleSubmit,
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

  const onSubmit = async (data: Feedback) => {
    try {
      await addDocument("feedbacks", { ...data, date: new Date().toISOString() });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const excludedIds = ["Kril", "Semak"];

  return (
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
        options={feedbackServiсes.map(({ value, label }) => ({
          value,
          label: t(label),
        }))}
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
        options={masters
          .filter(({ id }) => !excludedIds.includes(id))
          .map(({ name }) => ({
            value: name[selectedLanguage],
            label: name[selectedLanguage],
          }))}
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
  );
}

export default FeedbackForm;
