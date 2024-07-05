"use client";

import { Autocomplete, Box, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function EmployeeTimeclockEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const farmWorksData = queryResult?.data?.data;

  const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
    resource: "employee",
  });

  const { autocompleteProps: farmworkAutocompleteProps } = useAutocomplete({
    resource: "farmwork",
  });

  const clockInGeo = "51.5074, -0.1278";
  const clockOutGeo = "51.5088, 0.4278";

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="clockIn"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Clock In"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Clock In"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.clockIn} 
                    helperText={(errors as any)?.clockIn?.message}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
                inputFormat="yyyy/MM/dd hh:mm:ss" 
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name="clockOut"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Clock Out"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Clock Out"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.clockOut} 
                    helperText={(errors as any)?.clockOut?.message}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
                inputFormat="yyyy/MM/dd hh:mm:ss"
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("totalHours", {
            required: "This field is required",
          })}
          defaultValue={"2.5"}
          error={!!(errors as any)?.totalHours}
          helperText={(errors as any)?.totalHours?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Total Hours"}
          name="totalHours"
        />
      </Box>
    </Edit>
  );
}
