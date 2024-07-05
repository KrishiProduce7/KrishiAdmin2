"use client";

import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function VendorCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("vendorName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.vendorName}
          helperText={(errors as any)?.vendorName?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Vendor Name"}
          name="vendorName"
          required  
        />
        <TextField
          {...register("url", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.url}
          helperText={(errors as any)?.url?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Url"}
          name="url"
          required  
        />
        <TextField
          {...register("contactName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.contactName}
          helperText={(errors as any)?.contactName?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Contact Name"}
          name="contactName"
          required  
        />
        <TextField
          {...register("contactEmail", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.contactEmail}
          helperText={(errors as any)?.contactEmail?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Contact Email"}
          name="contactEmail"
          required  
        />
        <TextField
          {...register("contactPhone", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.contactPhone}
          helperText={(errors as any)?.contactPhone?.message}
          margin="normal"  
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Contact Phone"}
          name="contactPhone"
          required  
        />
      </Box>
    </Create>
  );
}
