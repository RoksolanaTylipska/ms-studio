import { Control, Controller, FieldValues, Path } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { t } from "i18next";

interface InputPhoneProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: object;
  required?: boolean;
}

export const InputPhone = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  required = false,
}: InputPhoneProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: t("modalWindow.input.phone_required"),
        },
        validate: (value) => {
          if (!value || value.trim().length <= 11) {
            return t("modalWindow.input.phone_required");
          }
          return true;
        },
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PhoneInput
          country="ua"
          value={value}
          onChange={onChange}
          countryCodeEditable={false}
          placeholder={label}
          enableSearch
          containerClass={error ? "containerClassError" : "containerClass"}
          buttonStyle={{
            backgroundColor: "transparent",
          }}
          inputStyle={{
            fontFamily: "Comfortaa, sans-serif",
            fontSize: "12px",
          }}
        />
      )}
    />
  );
};
