import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: any;
  rules?: object;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const SelectField = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  label,
  options,
  required = false,
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl fullWidth error={Boolean(errors?.[name])}>
          <InputLabel>
          {label} {required && <span style={{ color: "red" }}>*</span>}

          </InputLabel>

          <Select {...field} displayEmpty>
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
