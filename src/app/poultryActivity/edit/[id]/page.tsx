"use client";

import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller } from "react-hook-form";
import { createFilterOptions } from "@mui/material";
import { CanAccess } from "@refinedev/core";

export default function PoultryActivityEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: coopAutocompleteProps } = useAutocomplete({
    resource: "coop",
  });

  const { autocompleteProps: employeeAutocompleteProps } = useAutocomplete({
    resource: "employee",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.categoryDesc,
  });

  return (
    <CanAccess>
      <Edit 
        title={<Typography variant="h5">Edit Poultry Activity</Typography>}
        saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Controller
            control={control}
            name="coopId"
            rules={{ required: "This field is required" }}
            
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete
                {...coopAutocompleteProps}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value?.coopId);
                }} 
                onInputChange={(_, value) => {}}
                filterOptions={filterOptions}                   
                getOptionLabel={(item) => {
                  return (
                    coopAutocompleteProps?.options?.find((p) => {
                      const itemId =
                        typeof item === "object"
                          ? item?.coopId?.toString()
                          : item?.toString();
                      const pId = p?.coopId?.toString();
                      return itemId === pId;
                    })?.name ?? ""
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  const optionId = option?.coopId?.toString();
                  const valueId =
                    typeof value === "object"   
                      ? value?.coopId?.toString()
                      : value?.toString();
                  return value === undefined || optionId === valueId;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Vendor"}
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.coopId} 
                    helperText={(errors as any)?.coopId?.message}
                    InputLabelProps={{shrink: true}}  
                    required
                  />
                )}
              />
            )}
          />
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
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="day"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Day"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.day}
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
            {...register("feedBagsUsed", {
              min: 0
            })}
            error={!!(errors as any)?.feedBagsUsed}
            helperText={(errors as any)?.feedBagsUsed?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Feed Bags Used"}
            name="feedBagsUsed"
          />
          <TextField
            {...register("mediumEggsPicked", {
              min: 0
            })}
            error={!!(errors as any)?.mediumEggsPicked}
            helperText={(errors as any)?.mediumEggsPicked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Medium Eggs Picked"}
            name="mediumEggsPicked"
          />
          <TextField
            {...register("largeEggsPicked", {
              min: 0
            })}
            error={!!(errors as any)?.largeEggsPicked}
            helperText={(errors as any)?.largeEggsPicked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Large Eggs Picked"}
            name="largeEggsPicked"
          />
          <TextField
            {...register("eggsWashed", {
              min: 0
            })}
            error={!!(errors as any)?.eggsWashed}
            helperText={(errors as any)?.eggsWashed?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Eggs Washed"}
            name="eggsWashed"
          />
          <TextField
            {...register("eggsBroken", {
              min: 0
            })}
            error={!!(errors as any)?.eggsBroken}
            helperText={(errors as any)?.eggsBroken?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Eggs Broken"}
            name="eggsBroken"
          />
          <TextField
            {...register("nestboxEggs", {
              min: 0
            })}
            error={!!(errors as any)?.nestboxEggs}
            helperText={(errors as any)?.nestboxEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Nest Box Eggs"}
            name="nestboxEggs"
          />
          <TextField
            {...register("floorEggs", {
              min: 0
            })}
            error={!!(errors as any)?.floorEggs}
            helperText={(errors as any)?.floorEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Floor Eggs"}
            name="floorEggs"
          />
          <TextField
            {...register("cleanEggs", {
              min: 0
            })}
            error={!!(errors as any)?.cleanEggs}
            helperText={(errors as any)?.cleanEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Clean Eggs"}
            name="cleanEggs"
          />
          <TextField
            {...register("dirtyEggs", {
              min: 0
            })}
            error={!!(errors as any)?.dirtyEggs}
            helperText={(errors as any)?.dirtyEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Dirty Eggs"}
            name="dirtyEggs"
          />
          <TextField
            {...register("mediumEggsPacked", {
              min: 0
            })}
            error={!!(errors as any)?.mediumEggsPacked}
            helperText={(errors as any)?.mediumEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Medium Eggs Packed"}
            name="mediumEggsPacked"
          />
          <TextField
            {...register("largeEggsPacked", {
              min: 0
            })}
            error={!!(errors as any)?.largeEggsPacked}
            helperText={(errors as any)?.largeEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Large Eggs Packed"}
            name="largeEggsPacked"
          />
          <TextField
            {...register("xLargeEggsPacked", {
              min: 0
            })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Extra Large Eggs Packed"}
            name="xLargeEggsPacked"
          />
          <TextField
            {...register("manureBags", {
              min: 0
            })}
            error={!!(errors as any)?.xLargeEggsPacked}
            helperText={(errors as any)?.xLargeEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Extra Large Eggs Packed"}
            name="xLargeEggsPacked"
          />
          <TextField
            {...register("manureBags", {
              min: 0
            })}
            error={!!(errors as any)?.manureBags}
            helperText={(errors as any)?.manureBags?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Manure Bags"}
            name="manureBags"
          />
          <TextField
            {...register("chickensDead", {
                min: 0
            })}
            error={!!(errors as any)?.chickensDead}
            helperText={(errors as any)?.chickensDead?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Chickens Dead"}
            name="chickensDead"
          />
          <TextField
            {...register("deathReason")}
            error={!!(errors as any)?.deathReason}
            helperText={(errors as any)?.deathReason?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Death Reason"}
            name="deathReason"
          />
        </Box>
      </Edit>
    </CanAccess>
  );
}
