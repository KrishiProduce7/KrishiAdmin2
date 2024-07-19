"use client";

import { Box, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { CanAccess } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";


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
    <CanAccess>
      <Edit 
        title={<Typography variant="h5">Edit Clock In / Out</Typography>}
        isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Controller
            control={control}
            name="clockIn"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  {...field}
                  label="Clock In"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.clockIn}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    )
                  }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            name="clockOut"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  {...field}
                  label="Clock Out"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.clockOut}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    )
                  }}
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
    </CanAccess>
  );
}
