import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { dateFormat } from "@/constants";
import { PartialTodoDataType, TodoDataType } from "@/components/types";

interface DatePickerProps {
  name: keyof TodoDataType;
  control?: Control<PartialTodoDataType, any>;
  error?: boolean;
  helperText?: string;
  defaultValue?: Date;
  disablePast?: boolean;
}

const FormDatePicker = ({
  name,
  control,
  error,
  helperText = "",
  defaultValue,
  disablePast,
  ...rest
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={"mui-date"}>
        <Controller
          name={name}
          control={control}
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
