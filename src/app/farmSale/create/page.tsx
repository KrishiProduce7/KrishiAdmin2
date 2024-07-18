"use client";

import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller } from "react-hook-form";
import { createFilterOptions } from "@mui/material";

export default function FarmSaleCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: customerAutocompleteProps } = useAutocomplete({
    resource: "customer",
  });

  const filterOptionsCustomer = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.customerName,
  });

  const { autocompleteProps: itemAutocompleteProps } = useAutocomplete({
    resource: "item",
  });

  const filterOptionsItem = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.itemName,
  });

  return (
    <Create title={<Typography variant="h5">Create Farm Sale</Typography>} isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box 
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="customerId"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...customerAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.customerId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptionsCustomer}              
              getOptionLabel={(item) => {
                return (
                  customerAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.customerId?.toString()
                        : item?.toString();
                    const pId = p?.customerId?.toString();
                    return itemId === pId;
                  })?.customerName ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.customerId?.toString();
                const valueId =
                  typeof value === "object"   
                    ? value?.customerId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Customer"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.customerId} 
                  helperText={(errors as any)?.customerId?.message}
                  InputLabelProps={{shrink: true}}  
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="saleDate"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                {...field}
                label="Sale Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.saleDate}
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
          name="itemId"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...itemAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.itemId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptionsItem}              
              getOptionLabel={(item) => {
                return (
                  itemAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.itemId?.toString()
                        : item?.toString();
                    const pId = p?.itemId?.toString();
                    return itemId === pId;
                  })?.itemName ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.itemId?.toString();
                const valueId =
                  typeof value === "object"   
                    ? value?.itemId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Item"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.itemId} 
                  helperText={(errors as any)?.itemId?.message}
                  InputLabelProps={{shrink: true}}  
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("saleQty", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.saleQty}
          helperText={(errors as any)?.saleQty?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Sale Quantity"}
          name="saleQty"
          required  
        />
        <TextField
          {...register("saleDollar", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.saleDollar}
          helperText={(errors as any)?.saleDollar?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Sale Dollar"}
          name="saleDollar"
          required  
        />
      </Box>
    </Create>
  );
}
