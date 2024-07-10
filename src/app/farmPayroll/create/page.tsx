"use client";

import { Autocomplete, Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { createFilterOptions } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "@refinedev/simple-rest";
import { useApiUrl, useCustom } from "@refinedev/core";

export default function FarmPayrollCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm({});

  const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
    resource: "employee",
  });

  const url = useApiUrl();

  const filterOptions = createFilterOptions({
    matchFrom: "start", 
    stringify: (option: any) => option.firstName + " " + option.lastName,
  });

  return (
    <Create title={<Typography variant="h5">Create Farm Payroll</Typography>} isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
              onChange={async (_, value) => {
                field.onChange(value.employeeId);
                
                const response = await axiosInstance.get(`${url}/farmPayroll/employee?employeeId=${value.employeeId}`);

                if (response?.data.length > 0) {
                  const data = response?.data[0]
                  setValue('payStartDate', data?.payStartDate);
                  setValue('payEndDate', data?.payEndDate);
                  setValue('amountPaid', data?.totalPayroll);
                }
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
                  InputLabelProps={{shrink: true}}
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
          defaultValue={null}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay Start Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
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
          defaultValue={null}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay End Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
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
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="PaidOn Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
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
    </Create>
  );
}
