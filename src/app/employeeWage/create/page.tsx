"use client";

import { Autocomplete, Box, createFilterOptions, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CanAccess } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmployeeWageCreate() {
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

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.categoryDesc,
  });
 
  return (
    <CanAccess>
      <Create title={<Typography variant="h5">Create Employee Wage</Typography>} isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="on"
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
                filterOptions={filterOptions}              
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
                    InputLabelProps={{ shrink:true }}
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
                filterOptions={filterOptions}              
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
                    label={"Farm Work"}
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.farmWorkId} 
                    helperText={(errors as any)?.farmWorkId?.message}
                    InputLabelProps={{ shrink:true }}
                    required
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="startDate"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Start Date"
                  value={field.value || null}
                  onChange={(newValue) => field.onChange(newValue)}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.startDate}
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
            required 
          />
          <InputLabel shrink>Wage Unit</InputLabel>
          <Controller 
            name="wageUom"
            rules={{ required: "This field is required" }}
            control={control}
            defaultValue={"Box"}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={field?.value || "Box"}
                  label={"Wage Unit"}
                >
                  <MenuItem value="Box">Box</MenuItem>
                  <MenuItem value="Hour">Hour</MenuItem>
                </Select>
              );
            }}
          />
        </Box>
      </Create>
    </CanAccess>
  );
}
