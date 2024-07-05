"use client";

import { Stack, Typography } from "@mui/material";
import { useShow, useOne } from "@refinedev/core";
import { Show, TextFieldComponent as TextField, DateField, BooleanField } from "@refinedev/mui";

export default function FarmPayrollShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  const { data: employeeData, isLoading: employeeIsLoading } = useOne({
    resource: "employee",
    id: record?.employeeId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"Id"}
        </Typography>
        <TextField value={record?.payrollId} />

        <Typography variant="body1" fontWeight="bold">
          {"Employee"}
        </Typography>
        {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Pay Start Date"}
        </Typography> 
        <DateField value={record?.payStartDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Pay End Date"}
        </Typography> 
        <DateField value={record?.payEndDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Paied On"}
        </Typography> 
        <DateField value={record?.paidOn} />

        <Typography variant="body1" fontWeight="bold">
          {"Amount Paid"}
        </Typography> 
        <TextField value={record?.amountPaid} />

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
