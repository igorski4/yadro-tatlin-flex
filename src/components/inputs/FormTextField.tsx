import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import { Controller, Control, FieldName, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { TypeFormInput } from "../ModalEditProduct";
import { Product } from "../../../models/Product";

export type FormTextFieldProps<TFieldValues extends FieldValues = TypeFormInput> = {
  name: FieldName<TFieldValues>;
  control?: Control<TFieldValues>;
  label: string;
  disabled?: boolean;
  product?: Product;
  isRequired?: boolean;
};

const FormTextField: FC<FormTextFieldProps> = ({
  control,
  name,
  label,

  product,
  isRequired = false,
  ...rest
}) => {
  const rules = isRequired ? { required: "Don't skip on this field!" } : {};

  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        defaultValue={product?.[name]}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required={isRequired}
            label={label}
            variant="filled"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error ? fieldState.error.message : ""}
            {...rest}
          />
        )}
      />
    </FormControl>
  );
};

export default FormTextField;
