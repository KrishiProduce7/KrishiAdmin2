"use client";

import { Box, TextField, Switch, Autocomplete, Typography } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller } from "react-hook-form";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { createFilterOptions } from "@mui/material";

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

  const filterOptionsEmployee = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.firstName + " " + option.lastName,
  });

  const filterOptionsFarmwork = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.farmWorkDesc,
  });

  return (
    <Edit title={<Typography variant="h5">Edit Employee Task</Typography>} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="employeeId"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete 
              {...employeeAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.employeeId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptionsEmployee}              
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
          
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...farmworkAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.farmWorkId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptionsFarmwork}              
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
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                {...field}
                label="Assigned Start DateTime"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.assignedStartDateTime}
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
          name="assignedEndDateTime"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                {...field}
                label="Assigned End DateTime"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.assignedEndDateTime}
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
          {...register("taskNotes")}
          error={!!(errors as any)?.taskNotes}
          helperText={(errors as any)?.taskNotes?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Notes"}
          name="taskNotes"
        />
      </Box>
    </Edit>
  );
}
