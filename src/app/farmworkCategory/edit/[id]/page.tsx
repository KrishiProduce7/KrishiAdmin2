"use client";

import { Box, TextField, Switch, Typography } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function FarmworkCategoryEdit() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});
 
  return (
    <CanAccess>
      <Edit 
        saveButtonProps={saveButtonProps}
        title={<Typography variant="h5">Edit Farmwork Category</Typography>}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <TextField
            {...register("categoryDesc", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.categoryDesc}
            helperText={(errors as any)?.categoryDesc?.message}
            margin="normal"
            fullWidth 
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Description"} 
            name="categoryDesc"
            required 
          />
        </Box>
      </Edit>
    </CanAccess>
  );
}
