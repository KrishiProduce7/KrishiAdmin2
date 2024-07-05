"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
  BooleanField
} from "@refinedev/mui";

export default function EmployeeTimeclockShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: farmWorkData, isLoading: farmWorkIsLoading } = useOne({
    resource: "farmwork",
    id: record?.farmWorkId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

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
          {"ID"}
        </Typography>
        <TextField value={record?.timeclockId} />

        <Typography variant="body1" fontWeight="bold">
          {"Employee"}
        </Typography>
        {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Farm Work"}
        </Typography>
        {farmWorkIsLoading ? <>Loading...</> : <>{farmWorkData?.data?.farmWorkDesc}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Clock In Geo"}
        </Typography>
        <TextField value={record?.clockInGeo} />

        <Typography variant="body1" fontWeight="bold">
          {"Clock Out Geo"}
        </Typography>
        <TextField value={record?.clockOutGeo} />

        <Typography variant="body1" fontWeight="bold">
          {"Clock In"}
        </Typography>
        <DateField value={record?.clockIn} format="YYYY/MM/DD hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Clock On"}
        </Typography>
        <DateField value={record?.clockOn} format="YYYY/MM/DD hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Is Paid"}
        </Typography>
        <BooleanField value={record?.isPaid} />
      </Stack>
    </Show>
  );
}
