"use client";

import { Stack, Typography } from "@mui/material";
import { CanAccess, useOne, useShow } from "@refinedev/core";
import {
  BooleanField,
  DateField,
  Show,
  TextFieldComponent as TextField
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
    <CanAccess>
      <Show title={<Typography variant="h5">Show Employee Wage</Typography>} isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {"ID"}
          </Typography>
          <TextField value={record?.wageId} />

          <Typography variant="body1" fontWeight="bold">
            {"Employee"}
          </Typography>
          {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

          <Typography variant="body1" fontWeight="bold">
            {"Farm Work"}
          </Typography>
          {farmWorkIsLoading ? <>Loading...</> : <>{farmWorkData?.data?.farmWorkDesc}</>}

          <Typography variant="body1" fontWeight="bold">
            {"Start Date"}
          </Typography>
          <DateField value={record?.startDate} />

          <Typography variant="body1" fontWeight="bold">
            {"End Date"}
          </Typography>
          {record?.endDate ? <DateField value={record?.endDate ?? ""} /> : <><br/></>}

          <Typography variant="body1" fontWeight="bold">
            {"Wage"}
          </Typography>
          <TextField value={record?.wage} />

          <Typography variant="body1" fontWeight="bold">
            {"Wage Unit"}
          </Typography>
          <TextField value={record?.wageUom} />

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
