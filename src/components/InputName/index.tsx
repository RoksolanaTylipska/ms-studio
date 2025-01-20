import { TextField} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { t } from "i18next";

interface InputPhoneProps {
  control: Control<any>;
  errors?: any
}

const InputName = ({ control, errors}: InputPhoneProps ) => {
  return (
    <Controller
    name="name"
    control={control}
    rules={{
      required: {
        value: true,
        message: t("modalWindow.input.name_required"),
      },
    }}
    render={({ field }) => (
      <TextField
        style={{ paddingBottom: "10px" }}
        {...field}
        placeholder={t("modalWindow.input.name")}
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name ? String(errors.name.message) : ""}
      />
    )}
  />
  )
}

export default InputName