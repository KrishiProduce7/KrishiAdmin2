"use client";

import { Autocomplete, Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { createFilterOptions } from "@mui/material";

export default function FarmWorkCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "farmworkCategory",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.categoryDesc,
  });
 
  return (
    <Create 
      title={<Typography variant="h5">Create Farmwork</Typography>}
      isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.categoryId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptions}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.categoryId?.toString()
                        : item?.toString();
                    const pId = p?.categoryId?.toString();
                    return itemId === pId;
                  })?.categoryDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.categoryId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.categoryId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Category"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.categoryId} 
                  helperText={(errors as any)?.categoryId?.message}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("farmWorkDesc", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.farmWorkDesc}
          helperText={(errors as any)?.farmWorkDesc?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="farmWorkDesc"
          required
        />
      </Box>
    </Create>
  );
}
