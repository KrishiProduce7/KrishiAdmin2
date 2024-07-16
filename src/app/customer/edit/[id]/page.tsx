"use client";

import { Box, TextField, Select, MenuItem, Typography, InputLabel } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function CustomerEdit() {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm({});
 
  return ( 
    <Edit title={<Typography variant="h5">Edit Vendor</Typography>} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column"}}
        autoComplete="off"
      >
        <TextField
          {...register("customerName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.customerName}
          helperText={(errors as any)?.customerName?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="customerName"
          required  
        />
        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          id="email"
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email" 
          autoComplete="email"
          label={"Email"}
          name="email"
          inputProps={{
            type: "email",
          }}
          required  
        />
        <TextField
          {...register("phone", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.phone}
          helperText={(errors as any)?.phone?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Phone"}
          name="phone"
          required  
        />
        <InputLabel shrink>Store Type</InputLabel>
        <Controller
          name="customerType"
          rules={{ required: "This field is required" }}
          control={control}
          defaultValue={"Customer"}
          render={({ field }) => {
            return (
              <Select
                {...field}
                value={field?.value || "Box"}
                label={"Store Type"}
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Store">Store</MenuItem>
              </Select>
            );
          }}
        />
      </Box>
    </Edit>
  );
}
