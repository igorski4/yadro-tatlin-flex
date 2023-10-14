import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import { Controller, Control, FieldName, FieldValues, FieldError } from "react-hook-form";
import { TypeFormInput } from "../ModalEditProduct";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ErrorText from "./ErrorText";
import { Product } from "../../../models/Product";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";

export type FormDatePickerProps<TFieldValues extends FieldValues = TypeFormInput> = {
  name: FieldName<TFieldValues>;
  control?: Control<TFieldValues>;
  label: string;
  disabled?: boolean;
  product?: Product;
  isRequired?: boolean;
};

const FormDatePicker: FC<FormDatePickerProps> = ({ control, name, label, product, isRequired = false, ...rest }) => {
  const rules = !product?.order_date && isRequired ? { required: "Don't skip on this field!" } : {};

  return (
    <FormControl>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DatePicker
                {...field}
                label="Order date"
                views={["year", "month", "day"]}
                value={product ? DateTime.fromISO(product[name].toString()) : field.value}
                {...rest}
                slotProps={{
                  textField: {
                    error: Boolean(fieldState?.error),
                  },
                }}
              />
              <ErrorText error={fieldState.error?.message} />
            </LocalizationProvider>
          );
        }}
      />
    </FormControl>
  );
};

export default FormDatePicker;
