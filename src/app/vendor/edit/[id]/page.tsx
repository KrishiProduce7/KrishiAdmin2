"use client";

import { Box, TextField, Switch, Typography } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

export default function CoopEdit() {
  const {
    saveButtonProps,
    register,
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
          type="email" 
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
    </Edit>
  );
}
