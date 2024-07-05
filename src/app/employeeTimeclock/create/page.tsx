"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface IGeoLocation
{
  latitude: number,
  longitude: number
}

export default function EmployeeTimeclockCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
    resource: "employee",
  });

  const { autocompleteProps: farmworkAutocompleteProps } = useAutocomplete({
    resource: "farmwork",
  });

  const clockInGeo = "51.5074, -0.1278";
  const clockOutGeo = "51.5088, 0.4278";

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="employeeId" 
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...employeeAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.employeeId);
              }}  
              getOptionLabel={(item) => {
                return (
                  employeeAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.employeeId?.toString()
                        : item?.toString();
                    const pId = p?.employeeId?.toString();
                    return itemId === pId;
                  })?.firstName + " " + employeeAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.employeeId?.toString()
                        : item?.toString();
                    const pId = p?.employeeId?.toString();
                    return itemId === pId;
                  })?.lastName
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.employeeId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.employeeId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Employee"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.employeeId} 
                  helperText={(errors as any)?.employeeId?.message}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="farmWorkId"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (   
            <Autocomplete
              {...farmworkAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.farmWorkId);
              }} 
              getOptionLabel={(item) => {
                return (
                  farmworkAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.farmWorkId?.toString()
                        : item?.toString();
                    const pId = p?.farmWorkId?.toString();
                    return itemId === pId;
                  })?.farmWorkDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.farmWorkId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.farmWorkId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Farm Work"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.farmWorkId} 
                  helperText={(errors as any)?.farmWorkId?.message}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("clockInGeo", {
            required: "This field is required",
          })}
          value={clockInGeo?.toString()}
          error={!!(errors as any)?.clockInGeo}
          helperText={(errors as any)?.clockInGeo?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Clock In Geolocation"}
          name="clockInGeo"
        />
        <TextField
          {...register("clockOutGeo", {
            required: "This field is required",
          })}
          value={clockOutGeo?.toString()}
          error={!!(errors as any)?.clockOutGeo}
          helperText={(errors as any)?.clockOutGeo?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Clock Out Geolocation"}
          name="clockOutGeo"
        />
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
          value="2.5"
          error={!!(errors as any)?.totalHours}
          helperText={(errors as any)?.totalHours?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Total Hours"}
          name="totalHours"
        />
      </Box>
    </Create>
  );
}