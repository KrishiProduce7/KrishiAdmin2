"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField, DateField, BooleanField, EmailField } from "@refinedev/mui";

export default function CoopShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  return (
    <Show 
      title={<Typography variant="h5">Show Coop</Typography>}
      isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID #"}
        </Typography>
        <TextField value={record?.coopId} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Chickens Count #"}
        </Typography> 
        <TextField value={record?.chickensCount} />

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
  );
}
