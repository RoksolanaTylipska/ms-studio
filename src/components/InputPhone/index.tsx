import { Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { theme } from "@/styles";
import { t } from "i18next";

interface InputPhoneProps {
  control: Control<any>;
}

const InputPhone = ({ control }: InputPhoneProps) => {
  return (
    <Controller
      name="phone"
      control={control}
      rules={{
        required: {
          value: true,
          message: t("modalWindow.input.phone_required"),
        },
        validate: (value) => {
          if (!value || value.trim().length <= 11) {
            return t("modalWindow.input.phone_required");
          }
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <PhoneInput
            country="ua"
            value={value}
            onChange={onChange}
            countryCodeEditable={false}
            placeholder={t("modalWindow.input.phone")}
            enableSearch={true}
            containerClass="containerClass"
            buttonStyle={{
              backgroundColor: "transparent",
            }}
            inputStyle={{
              fontFamily: "Comfortaa, sans-serif",
              fontSize: "12px",
            }}
          />
          {error && (
            <Typography
              sx={{
                color: theme.palette.colors.latte,
                fontSize: "12px",
                fontFamily: "Comfortaa, sans-serif",
                marginLeft: "15px",
              }}
            >
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default InputPhone;
