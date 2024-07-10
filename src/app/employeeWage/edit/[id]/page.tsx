"use client";

import { Box, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

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
              <DatePicker
                {...field}
                label="Start Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
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
  );
}
