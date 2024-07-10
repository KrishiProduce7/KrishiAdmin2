"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import { 
  Show, 
  TextFieldComponent as TextField, 
  DateField, 
  BooleanField, 
  EmailField
} from "@refinedev/mui";

export default function EmployeeTaskShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  const { data: farmworkData, isLoading: farmworkIsLoading } = useOne({
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
    <Show title={<Typography variant="h5">Show Employee Task</Typography>} isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID #"}
        </Typography>
        <TextField value={record?.taskId} />

        <Typography variant="body1" fontWeight="bold">
          {"Employee"}
        </Typography>
        {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Farm Work"}
        </Typography>
        {farmworkIsLoading ? <>Loading...</> : <>{farmworkData?.data?.farmWorkDesc ?? ""}</>}
        
        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.taskDesc} />

        <Typography variant="body1" fontWeight="bold">
          {"Assigned Start Time"}
        </Typography>
        <DateField value={record?.assignedStartDateTime} format="YYYY/MM/dd hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Assigned End Time"}
        </Typography>
        <DateField value={record?.assignedEndDateTime} format="YYYY/MM/dd hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Actual Start Time"}
        </Typography>
        <DateField value={record?.actualStartDateTime} format="YYYY/MM/dd hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Actual End Time"}
        </Typography>
        <DateField value={record?.actualEndDateTime} format="YYYY/MM/dd hh:mm:ss"/>

        <Typography variant="body1" fontWeight="bold">
          {"Percent Complete #"}
        </Typography>
        <TextField value={record?.taskPercentComplete} />

        <Typography variant="body1" fontWeight="bold">
          {"Notes"}
        </Typography>
        <TextField value={record?.taskNotes} />

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
