import dayjs from "dayjs";
import { Control, FieldValues, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { dateFormat } from "@/constants";

interface CustomDatePickerProps<T> {
  name: Extract<keyof T, string>;
  control: Control<FieldValues, any>;
  error?: boolean;
  helperText?: string;
  defaultValue?: Date;
  disablePast?: boolean;
}

const FormDatePicker = <T,>({
  name,
  control,
  error,
  helperText = "",
  defaultValue = "",
  disablePast,
  ...rest
}: CustomDatePickerProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={"mui-date"}>
        <Controller
          name={name}
          control={control as Control<FieldValues, any>}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Deadline"
              format={dateFormat}
              onChange={onChange}
              disablePast={disablePast}
              value={value ? dayjs(value) : null}
              slotProps={{
                actionBar: {
                  actions: ["today", "accept"],
                },
                textField: {
                  error: error,
                  helperText: helperText,
                },
              }}
              {...rest}
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
};

export default FormDatePicker;
