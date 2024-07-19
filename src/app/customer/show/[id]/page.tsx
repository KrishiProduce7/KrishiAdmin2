"use client";

import { Stack, Typography } from "@mui/material";
import { CanAccess, useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField, DateField, BooleanField, EmailField } from "@refinedev/mui";

export default function CoopShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  return (
    <CanAccess>
      <Show title={<Typography variant="h5">Show Vendor</Typography>} isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {"ID #"}
          </Typography>
          <TextField value={record?.vendorId} />

          <Typography variant="body1" fontWeight="bold">
            {"Vendor Name"}
          </Typography>
          <TextField value={record?.vendorName} />

          <Typography variant="body1" fontWeight="bold">
            {"Url"}
          </Typography>
          <TextField value={record?.url} />

          <Typography variant="body1" fontWeight="bold">
            {"Contact Name"}
          </Typography>
          <TextField value={record?.contactName} />

          <Typography variant="body1" fontWeight="bold">
            {"Contact Email"}
          </Typography>
          <TextField value={record?.contactEmail} />

          <Typography variant="body1" fontWeight="bold">
            {"Contact Phone"}
          </Typography> 
          <TextField value={record?.contactPhone} />

          <Typography variant="body1" fontWeight="bold">
            {"Active"}
          </Typography>
          <BooleanField value={record?.isActive} />

          <Typography variant="body1" fontWeight="bold">
            {"Updated By"}
          </Typography>
          <TextField value={record?.updatedBy} />

          <Typography variant="body1" fontWeight="bold">
            {"Updated On"}
          </Typography> 
          <DateField value={record?.updatedOn} format="YYYY/MM/DD hh:mm:ss"/>

        </Stack>
      </Show>
    </CanAccess>
  );
}
