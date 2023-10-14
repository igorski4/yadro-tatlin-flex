import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { Controller, Control, FieldName, FieldValues } from "react-hook-form";
import { TypeFormInput } from "../ModalEditProduct";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Product } from "../../../models/Product";
import { log } from "console";

export type FormCheckboxProps<TFieldValues extends FieldValues = TypeFormInput> = {
  name: FieldName<TFieldValues>;
  control?: Control<TFieldValues>;
  label: string;
  disabled?: boolean;
  product?: Product;
};

const FormCheckbox: FC<FormCheckboxProps> = ({ control, name, label, product, ...rest }) => {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={Boolean(product?.[name])}
            render={({ field }) => <Checkbox defaultChecked={Boolean(product?.[name])} {...field} {...rest} />}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default FormCheckbox;
