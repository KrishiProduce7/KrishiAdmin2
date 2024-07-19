"use client";

import { Box, TextField, Typography } from "@mui/material";
import { CanAccess } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function CoopEdit() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});
 
  return (
    <CanAccess>
      <Edit 
        title={<Typography variant="h5">Edit Coop</Typography>}
        saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
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
        </Box>
      </Edit>
    </CanAccess>
  );
}
