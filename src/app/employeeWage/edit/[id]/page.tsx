"use client";

import { Box, InputLabel, Select, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CanAccess } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EmployeeWageEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  return (
    <CanAccess>
      <Edit title={<Typography variant="h5">Edit Employee Wage</Typography>} isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box   
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Controller
            control={control}
            name="startDate"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  {...field}
                  label="Start Date"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.startDate}
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
            {...register("wage", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.wage}
            helperText={(errors as any)?.wage?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Wage"}
            name="wage"
          />
          <InputLabel shrink>Wage Unit</InputLabel>
          <Controller
            name="wageUom"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={field?.value || "Box"}
                  label="Wage Unit"
                >
                  <MenuItem value="Box">Box</MenuItem>
                  <MenuItem value="Hour">Hour</MenuItem>
                </Select>
              );
            }}
          />
        </Box>
      </Edit>
    </CanAccess>
  );
}
