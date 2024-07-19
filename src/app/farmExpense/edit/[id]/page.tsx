"use client";

import { Autocomplete, Box, createFilterOptions, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CanAccess } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function FarmExpenseEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: vendorAutocompleteProps } = useAutocomplete({
    resource: "vendor",
  });
 
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.categoryDesc,
  });

  return (
    <CanAccess>
      <Edit title={<Typography variant="h5">Edit Farm Expense</Typography>} saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <InputLabel shrink>Expense Type</InputLabel>
          <Controller
            name="expenseType"
            rules={{ required: "This field is required" }}
            control={control}
            defaultValue={"Farm"}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={field?.value || "Farm"}
                  label={"Expense Type"}
                >
                  <MenuItem value="Farm">Farm</MenuItem>
                  <MenuItem value="Poultry">Poultry</MenuItem>
                  <MenuItem value="Payroll">Payroll</MenuItem>
                </Select>
              );
            }}
          />
          <Controller
            control={control}
            name="vendorId"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete
                {...vendorAutocompleteProps}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value?.vendorId);
                }} 
                onInputChange={(_, value) => {}}
                filterOptions={filterOptions}              
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
                        error={!!errors.expenseDate}
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
            type="number"
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
      </Edit>
    </CanAccess>
  );
}
