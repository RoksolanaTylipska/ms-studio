import { TextField } from "@mui/material";
import { Controller, Control, FieldValues, Path, FieldErrors } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  rules?: object;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
  type?: string;
  required?: boolean;
}

const InputField = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  label,
  placeholder,
  multiline = false,
  minRows,
  type = "text",
  required = false,
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={
            <>
              {label} {required && <span style={{ color: "red" }}>*</span>}
            </>
          }
          placeholder={placeholder}
          variant="outlined"
          error={Boolean(errors?.[name]?.message)}
          multiline={multiline}
          minRows={minRows}
          type={type}
          fullWidth
        />
      )}
    />
  );
};

export default InputField;
