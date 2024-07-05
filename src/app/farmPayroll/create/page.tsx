"use client";

import { Autocomplete, Box, FormControlLabel, Switch, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function FarmPayrollCreate() {
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
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay Start Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Pay Start Date"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.payStartDate} 
                    helperText={(errors as any)?.payStartDate?.message}
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name="payEndDate"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Pay Start Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Pay End Date"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.payEndDate} 
                    helperText={(errors as any)?.payEndDate?.message}
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name="paidOn"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Paid Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Paid Date"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.paidON} 
                    helperText={(errors as any)?.paidON?.message}
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
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
