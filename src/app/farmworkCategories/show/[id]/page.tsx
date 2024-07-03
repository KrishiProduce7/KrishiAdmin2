"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField, DateField, BooleanField } from "@refinedev/mui";

export default function FarmworkCategoryShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"Id"}
        </Typography>
        <TextField value={record?.CategoryId} />

        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.CategoryDesc} />

        <Typography variant="body1" fontWeight="bold">
          {"Active"}
        </Typography>
        <BooleanField value={record?.IsActive} />

        <Typography variant="body1" fontWeight="bold">
          {"Updated By"}
        </Typography>
        <TextField value={record?.UpdatedBy} />

        <Typography variant="body1" fontWeight="bold">
          {"Updated On"}
        </Typography>
        <DateField value={record?.UpdatedOn} />
      </Stack>
    </Show>
  );
}
