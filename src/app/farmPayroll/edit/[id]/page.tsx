"use client";

import { Box, FormControlLabel, Switch, TextField, Autocomplete, Typography } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { createFilterOptions } from "@mui/material";

export default function FarmPayrollEdit() {
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

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.categoryDesc,
  });

  return (
    <Edit title={<Typography variant="h5">Edit Farm Payroll</Typography>} saveButtonProps={saveButtonProps}>
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
                field.onChange(value.employeeId);
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
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="payStartDate"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay Start Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name="payEndDate"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay Start Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
<Controller
          control={control}
          name="paidOn"
          
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Paid Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("amountPaid", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.amountPaid}
          helperText={(errors as any)?.amountPaid?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Paid Amount"}
          name="amountPaid"
          required 
        />
      </Box>
    </Edit>
  );
}
