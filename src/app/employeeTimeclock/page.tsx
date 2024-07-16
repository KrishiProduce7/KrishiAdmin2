"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";

import {
  BooleanField,
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import IEmployeeTimeclock from "./types";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { Typography } from "@mui/material";

export default function EmployeeTimeclockList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "client",
    }
  });
 
  const { data: employeeData, isLoading: employeeIsLoading, isError: errorEmployeeData  } = useList({
    resource: "employee",
  });
 
  const { data: farmworkData, isLoading: farmworkIsLoading, isError: errorFarmWorkData } = useList({
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
        valueGetter: ({ row }) => {
          const value = row?.employeeId;
          return value;
        },
        renderCell: function render({ value }) {
          return employeeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.firstName + " " + 
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.lastName
          );
        },
      },
      {
        field: "taskId",
        flex: 1,
        headerName: "Employee Task",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.taskId;
          return value;
        },
        renderCell: function render({ value }) {
          return farmworkIsLoading ? (
            <>Loading...</>
          ) : (
            farmworkData?.data?.find((item) => item.taskId?.toString() === value?.toString())?.taskDesc ?? ""
          );
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
          return <BooleanField 
            value={value}
            trueIcon={<CheckOutlined style={{ color: green[500] }} />}
            falseIcon={<CloseOutlined style={{ color: red[500] }} />}
            />
        }
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.timeclockId} />
              <DeleteButton hideText recordItemId={row.timeclockId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [employeeIsLoading, farmworkIsLoading, employeeData, farmworkData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployeeTimeclock> = (row) => row.timeclockId?.toString();

  return (
    <List 
      title={<Typography variant="h5">Employee Timeclock</Typography>}
      headerButtons={({ createButtonProps }) => (  
        <>  
          {createButtonProps && (  
          <CreateButton  
          {...createButtonProps}>  
          Clock In / Out
          </CreateButton>  
          )}
        </>
      )}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
