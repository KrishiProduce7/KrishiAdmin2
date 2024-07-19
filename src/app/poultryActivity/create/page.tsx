"use client";

import IEmployee from "@app/employee/types";
import { Autocomplete, Box, createFilterOptions, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CanAccess, useGetIdentity } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function PoultryActivityCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: coopAutocompleteProps } = useAutocomplete({
    resource: "coop",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name, 
  });

  const { data: user } = useGetIdentity<IEmployee>();

  const onFinishHandler = (data : any) => {
    const adapterDate = new AdapterDateFns();

    onFinish({ 
      ...data,
      employeeId: user?.employeeId,
    });
  };

  return (
    <CanAccess>
      <Create 
        title={<Typography variant="h5">Create Poultry Activity</Typography>}
        isLoading={formLoading} 
        saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onFinishHandler) }}>
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
                    label={"Coop"}
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
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.feedBagsUsed}
            helperText={(errors as any)?.feedBagsUsed?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Feed Bags Used #"}
            name="feedBagsUsed"
          />
          <TextField
            {...register("mediumEggsPicked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.mediumEggsPicked}
            helperText={(errors as any)?.mediumEggsPicked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Medium Eggs Picked #"}
            name="mediumEggsPicked"
          />
          <TextField
            {...register("largeEggsPicked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.largeEggsPicked}
            helperText={(errors as any)?.largeEggsPicked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Large Eggs Picked #"}
            name="largeEggsPicked"
          />
          <TextField
            {...register("xLargeEggsPicked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.xLargeEggsPicked}
            helperText={(errors as any)?.xLargeEggsPicked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Extra Large Eggs Picked #"}
            name="xLargeEggsPicked"
          />
          <TextField
            {...register("eggsWashed", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.eggsWashed}
            helperText={(errors as any)?.eggsWashed?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Eggs Washed #"}
            name="eggsWashed"
          />
          <TextField
            {...register("eggsBroken", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.eggsBroken}
            helperText={(errors as any)?.eggsBroken?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Eggs Broken #"}
            name="eggsBroken"
          />
          <TextField
            {...register("nestboxEggs", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.nestboxEggs}
            helperText={(errors as any)?.nestboxEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Nest Box Eggs #"}
            name="nestboxEggs"
          />
          <TextField
            {...register("floorEggs", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.floorEggs}
            helperText={(errors as any)?.floorEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Floor Eggs #"}
            name="floorEggs"
          />
          <TextField
            {...register("cleanEggs", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.cleanEggs}
            helperText={(errors as any)?.cleanEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Clean Eggs #"}
            name="cleanEggs"
          />
          <TextField
            {...register("dirtyEggs", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.dirtyEggs}
            helperText={(errors as any)?.dirtyEggs?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Dirty Eggs #"}
            name="dirtyEggs"
          />
          <TextField
            {...register("mediumEggsPacked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.mediumEggsPacked}
            helperText={(errors as any)?.mediumEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Medium Eggs Packed #"}
            name="mediumEggsPacked"
          />
          <TextField
            {...register("largeEggsPacked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.largeEggsPacked}
            helperText={(errors as any)?.largeEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Large Eggs Packed #"}
            name="largeEggsPacked"
          />
          <TextField
            {...register("xLargeEggsPacked", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.xLargeEggsPacked}
            helperText={(errors as any)?.xLargeEggsPacked?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Extra Large Eggs Packed #"}
            name="xLargeEggsPacked"
          />
          <TextField
            {...register("manureBags", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.manureBags}
            helperText={(errors as any)?.manureBags?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Manure Bags #"}
            name="manureBags"
          />
          <TextField
            {...register("chickensDead", {
              min: {
                value: 0, 
                message: "This field should be above 0"
              },
            })}
            error={!!(errors as any)?.chickensDead}
            helperText={(errors as any)?.chickensDead?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Chickens Dead #"}
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
      </Create>
    </CanAccess>
  );
}
