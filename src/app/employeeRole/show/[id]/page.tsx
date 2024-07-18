"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField, DateField, BooleanField, EmailField } from "@refinedev/mui";

export default function EmployeeRoleShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  return (
    <CanAccess>
      <Show 
        title={<Typography variant="h5">Show Employee Role</Typography>}     
        isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {"ID #"}
          </Typography>
          <TextField value={record?.roleId} />

          <Typography variant="body1" fontWeight="bold">
            {"Role Name"}
          </Typography>
          <TextField value={record?.roleName} />

          <Typography variant="body1" fontWeight="bold">
            {"Description"}
          </Typography>
          <TextField value={record?.roleDesc} />

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
