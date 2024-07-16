"use client";

import { Box, TextField, Typography } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function CoopCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create 
      title={<Typography variant="h5">Create Coop</Typography>}
      isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextField
        {...register("name", {
          required: "This field is required",
        })}
        error={!!(errors as any)?.name}
        helperText={(errors as any)?.name?.message}
        margin="normal"  
        fullWidth
        InputLabelProps={{ shrink: true }}
        type="text"
        label={"Name"}
        name="name"
        required  
      />
      <TextField
        {...register("location", {
          required: "This field is required",
        })}
        error={!!(errors as any)?.location}
        helperText={(errors as any)?.location?.message}
        margin="normal"  
        fullWidth
        InputLabelProps={{ shrink: true }}
        type="text"
        label={"Location"}
        name="location"
        required  
      />
      <TextField
        {...register("chickensCount", {
          required: "This field is required",
        })}
        error={!!(errors as any)?.chickensCount}
        helperText={(errors as any)?.chickensCount?.message}
        margin="normal"  
        fullWidth
        InputLabelProps={{ shrink: true }}
        type="number"
        label={"Chickens Count #"} 
        name="chickensCount"
        required  
      />
    </Create>
  );
}
