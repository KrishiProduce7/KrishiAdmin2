"use client";

import { Box, TextField, Switch, Autocomplete } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function EmployeeTaskEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});
 
  const { autocompleteProps: farmworkAutocompleteProps } = useAutocomplete({
    resource: "farmwork",
  });

  const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
    resource: "employee",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
                  })?.firstName + " " + 
                  employeeAutocompleteProps?.options?.find((p) => {
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
                  farmworkAutocompleteProps.options?.find((p) => {
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
                  label={"FarmWork"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.farmWorkId} 
                  helperText={(errors as any)?.farmWorkId?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("taskDesc", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.taskDesc}
          helperText={(errors as any)?.taskDesc?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="taskDesc"
          required 
        />
        <Controller
          control={control}
          name="assignedStartDateTime"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Assigned Start DateTime"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Assigned Start DateTime"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.assignedStartDateTime} 
                    helperText={(errors as any)?.assignedStartDateTime?.message}
                    InputLabelProps={{shrink: true}}
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
          name="assignedEndDateTime"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Assigned End DateTime"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Assigned End DateTime"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.assignedEndDateTime} 
                    helperText={(errors as any)?.assignedEndDateTime?.message}
                    InputLabelProps={{shrink: true}}
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
          name="actualStartDateTime"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Actual Start DateTime"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Actual Start DateTime"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.actualStartDateTime} 
                    helperText={(errors as any)?.actualStartDateTime?.message}
                    InputLabelProps={{shrink: true}}
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
          name="actualEndDateTime"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                label="Actual End DateTime"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Actual End DateTime"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.actualEndDateTime} 
                    helperText={(errors as any)?.actualEndDateTime?.message}
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
                inputFormat="yyyy/MM/dd hh:mm:ss" 
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("taskPercentComplete", {
            required: "This field is required",
            min: {
              value: 0, 
              message: "This field should be above 0"
            },
            max: {
              value: 100,
              message: "This field should be below 100"
            }
          })}
          error={!!(errors as any)?.taskPercentComplete}
          helperText={(errors as any)?.taskPercentComplete?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Percent Complete"}
          name="taskPercentComplete"
          required 
        />
        <TextField
          {...register("taskNotes", {
            required: "This field is required",
            min: 0,
            max: 100
          })}
          error={!!(errors as any)?.taskNotes}
          helperText={(errors as any)?.taskNotes?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Notes"}
          name="taskNotes"
          required 
        />
      </Box>
    </Edit>
  );
}
