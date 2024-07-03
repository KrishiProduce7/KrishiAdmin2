"use client";

import { Autocomplete, Box, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmployeeWageEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
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

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name={"employeeId"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...employeeAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.EmployeeId);
              }} 
              getOptionLabel={(item) => {
                return (
                  employeeAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.EmployeeId?.toString()
                        : item?.toString();
                    const pId = p?.EmployeeId?.toString();
                    return itemId === pId;
                  })?.FirstName + " " + employeeAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.EmployeeId?.toString()
                        : item?.toString();
                    const pId = p?.EmployeeId?.toString();
                    return itemId === pId;
                  })?.LastName ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.EmployeeId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.EmployeeId?.toString()
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
          name={"farmworkId"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...farmworkAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.farmworkId);
              }} 
              getOptionLabel={(item) => {
                return (
                  employeeAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.FarmWorkId?.toString()
                        : item?.toString();
                    const pId = p?.FarmWorkId?.toString();
                    return itemId === pId;
                  })?.FarmWorkDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.FarmWorkId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.FarmWorkId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"FarmWork"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.farmworkId} 
                  helperText={(errors as any)?.farmworkId?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={"startDate"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="StartDate"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"StartDate"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.startDate} 
                    helperText={(errors as any)?.startDate?.message}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("wage", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.wage}
          helperText={(errors as any)?.wage?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Wage"}
          name="wage"
        />
        <Controller
          name="wageUnit"
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                value={field?.value || "draft"}
                label={"Wage Unit"}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            );
          }}
        />
      </Box>
    </Edit>
  );
}
