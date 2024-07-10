"use client";

import { Box, TextField, Typography } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function EmployeeRoleCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create 
      title={<Typography variant="h5">Create Employee Role</Typography>}
      isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
          required
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
          required
        />
      </Box>
    </Create>
  );
}
