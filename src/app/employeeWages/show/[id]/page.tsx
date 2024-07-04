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

export default function EmployeeWageShow() {
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

  const { data: farmWorkData, isLoading: farmWorkIsLoading } = useOne({
    resource: "farmwork",
    id: record?.farmWorkId || "",
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
        <TextField value={record?.EmployeewageId} />

        <Typography variant="body1" fontWeight="bold">
          {"Title"}
        </Typography>
        {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        {farmWorkIsLoading ? <>Loading...</> : <>{farmWorkData?.data?.farmWorkDesc}</>}

        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <DateField value={record?.startDate} />

        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <DateField value={record?.wage} />

        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.wage} />

        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.WageUnit} />

        <Typography variant="body1" fontWeight="bold">
          {"Active"}
        </Typography>
        <BooleanField value={record?.isActive} />

        <Typography variant="body1" fontWeight="bold">
          {"Status"}
        </Typography>
        <TextField value={record?.updatedBy} />

        <Typography variant="body1" fontWeight="bold">
          {"CreatedAt"}
        </Typography>
        <DateField value={record?.updatedOn} />
      </Stack>
    </Show>
  );
}
