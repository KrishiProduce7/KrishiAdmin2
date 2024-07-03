"use client";

import { Box, TextField, Switch } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function EmployeeRoleEdit() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});
 
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("roleName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.roleName}
          helperText={(errors as any)?.roleName?.message}
          margin="normal"
          fullWidth 
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Role Name"} 
          name="roleName"
        />
        <TextField
          {...register("roleDesc", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.roleDesc}
          helperText={(errors as any)?.roleDesc?.message}
          margin="normal"
          fullWidth 
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"} 
          name="roleDesc"
        />
      </Box>
    </Edit>
  );
}
