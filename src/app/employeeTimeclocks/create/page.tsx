"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmployeeTimeclockCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "farmworkCategories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("FarmWorkDesc", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.FarmWorkDesc}
          helperText={(errors as any)?.FarmWorkDesc?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="FarmWorkDesc"
        />
        <Controller
          control={control}
          name={"CategoryId"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.CategoryId?.toString()
                        : item?.toString();
                    const pId = p?.CategoryId?.toString();
                    return itemId === pId;
                  })?.CategoryDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.CategoryId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Category"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.CategoryId}
                  helperText={(errors as any)?.CategoryId?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
}
