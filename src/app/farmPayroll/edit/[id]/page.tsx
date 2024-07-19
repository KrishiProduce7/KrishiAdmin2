"use client";

import { Autocomplete, Box, createFilterOptions, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CanAccess } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

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
    <CanAccess>
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
                <MobileDatePicker
                  {...field}
                  label="Pay Start Date"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.payStartDate}
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
            name="payEndDate"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Pay Start Date"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.payEndDate}
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
            name="paidOn"
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Paid Date"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.paidOn}
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
    </CanAccess>
  );
}
