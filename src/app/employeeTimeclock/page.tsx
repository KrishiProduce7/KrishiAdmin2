"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { CanAccess, useApiUrl, useCustom, useGetIdentity, useList } from "@refinedev/core";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import {
  BooleanField,
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  List,
  useDataGrid
} from "@refinedev/mui";
import React, { useEffect, useState } from "react";
import IEmployeeTimeclock from "./types";
import IEmployee, { SUPER_ADMIN, EMPLOYEE_TYPE } from "@app/employee/types";

export default function EmployeeTimeclockList() {
  const [timeClocks, setTimeClocks] = useState<IEmployeeTimeclock[]>([]);
  const [clockButtonLabel, setClockButtonLabel] = useState<string>('Clock In / Out');

  const { data: user} = useGetIdentity<IEmployee>();
  const API_URL = useApiUrl();

  const { refetch: refetchAll } = useList({
    resource: "employeeTimeclock",
  });

  const { refetch: refetchForEmployee } = useCustom({
    url: `${API_URL}/employeeTimeclock/email`,
    method: 'get',
    config: {
      query: {
        email: user?.email,
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ( Number(user?.roleId) === SUPER_ADMIN) {
          const response = await refetchAll();
          if (response?.data) {
            setTimeClocks(response?.data.data as IEmployeeTimeclock[]);
            setClockButtonLabel("Clock In / Out");
          }
     
        } else if ( Number(user?.roleId) === EMPLOYEE_TYPE) {
          const response = await refetchForEmployee();
          if (response?.data) {
            setTimeClocks(response?.data.data as IEmployeeTimeclock[]);
            setClockButtonLabel("Clock In");
          }
        }
      } catch (error) {
        console.error("Error fetching timeclocks", error);
      }
    };

    if (user)
      fetchData();
  }, [user, refetchAll, refetchForEmployee]); 

  const { data: employeeData, isLoading: employeeIsLoading } = useList({
    resource: "employee",
  });

  const { data: taskData, isLoading: taskIsLoading } = useList({
    resource: "employeeTask",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "timeclockId",
        headerName: "ID #",
        type: "number",
        minWidth: 50,
      },
      {
        field: "employeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 100,
        valueGetter: ({ row }) => row?.employeeId,
        renderCell: function render({ value }) {
          if (employeeIsLoading) return <>Loading...</>;
          const employee = employeeData?.data?.find((item) => item.employeeId.toString() === value.toString());
          return employee ? `${employee.firstName} ${employee.lastName}` : "";
        },
      },
      {
        field: "taskId",
        flex: 1,
        headerName: "Employee Task",
        minWidth: 100,
        valueGetter: ({ row }) => row?.taskId,
        renderCell: function render({ value }) {
          if (taskIsLoading) return <>Loading...</>;
          const task = taskData?.data?.find((item) => item.taskId?.toString() === value?.toString());
          return task?.taskDesc ?? "";
        },
      },
      {
        field: "clockInGeo",
        flex: 1,
        headerName: "Clock In Geo",
        minWidth: 150,
      },
      {
        field: "clockOutGeo",
        flex: 1,
        headerName: "Clock Out Geo",
        minWidth: 150,
      },
      {
        field: "clockIn",
        flex: 1,
        headerName: "Clock In",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "clockOut",
        flex: 1,
        headerName: "Clock Out",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "totalHours",
        headerName: "Total Hours",
        type: "number",
        minWidth: 100,
      },
      {
        field: "isPaid",
        headerName: "Is Paid",
        minWidth: 100,
        renderCell: function render({ value }) {
          return (
            <BooleanField 
              value={value}
              trueIcon={<CheckOutlined style={{ color: green[500] }} />}
              falseIcon={<CloseOutlined style={{ color: red[500] }} />}
            />
          );
        }
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          if (Number(user?.roleId) == SUPER_ADMIN) {
            return (
              <>
                <EditButton hideText recordItemId={row.timeclockId} />
                <DeleteButton hideText recordItemId={row.timeclockId} />
              </>
            );  
          } else if (Number(user?.roleId) == EMPLOYEE_TYPE) {
            return (
              <>
              </>
            );
          }
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [employeeIsLoading, taskIsLoading, employeeData, taskData, user]
  );

  const getRowId: GridRowIdGetter<IEmployeeTimeclock> = (row) => row.timeclockId?.toString();

  return (
    <CanAccess>
      <List 
        title={<Typography variant="h5">Employee Timeclock</Typography>}
        headerButtons={({ createButtonProps }) => (  
          <>  
            {createButtonProps && (  
              <CreateButton {...createButtonProps}>  
                {clockButtonLabel}
              </CreateButton>  
            )}
          </>
        )}>
        <DataGrid 
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          rows={timeClocks} getRowId={getRowId} columns={columns} autoHeight pageSizeOptions={[25]}/>
      </List>
    </CanAccess>
  );
}
