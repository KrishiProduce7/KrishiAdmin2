"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from "react-hook-form";

export default function FarmExpenseCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: vendorAutocompleteProps } = useAutocomplete({
    resource: "vendor",
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
          name="vendorId"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...vendorAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.vendorId);
              }} 
              getOptionLabel={(item) => {
                return (
                  vendorAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.vendorId?.toString()
                        : item?.toString();
                    const pId = p?.vendorId?.toString();
                    return itemId === pId;
                  })?.vendorName ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.vendorId?.toString();
                const valueId =
                  typeof value === "object"   
                    ? value?.vendorId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Vendor"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.vendorId} 
                  helperText={(errors as any)?.vendorId?.message}
                  InputLabelProps={{shrink: true}}  
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="expenseDate"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Expense Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Expense Date"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.expenseDate} 
                    helperText={(errors as any)?.expenseDate?.message}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("itemName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.itemName}
          helperText={(errors as any)?.itemName?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Item Name"}
          name="itemName"
          required  
        />
        <TextField
          {...register("totalQty", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.totalQty}
          helperText={(errors as any)?.totalQty?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Total Quantity"}
          name="totalQty"
          required  
        />
        <TextField
          {...register("totalAmount", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.totalAmount}
          helperText={(errors as any)?.totalAmount?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Total Amount"}
          name="totalAmount"
          required  
        />
      </Box>
    </Create>
  );
}
