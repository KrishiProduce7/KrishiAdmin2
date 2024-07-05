"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";

import {
  BooleanField,
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

interface IEmployeeTimeclock {
  timeclockId: number;
  employeeId: number;
  farmWorkId: number;
  clockInGeo: string;
  clockOutGeo: string;
  ClockIn: Date;
  ClockOut: Date;
  Hours: number;
  updatedBy: string;
  updatedOn: Date;
}

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
    resource: "farmwork",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "timeclockId",
        headerName: "Id",
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
        field: "farmWorkId",
        flex: 1,
        headerName: "Farm Work",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.farmWorkId;
          return value;
        },
        renderCell: function render({ value }) {
          return farmworkIsLoading ? (
            <>Loading...</>
          ) : (
            farmworkData?.data?.find((item) => item.farmWorkId.toString() === value.toString())?.farmWorkDesc ?? ""
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
        flex: 1,
        headerName: "Total Hours",
        minWidth: 100,
      },
      {
        field: "isPaid",
        flex: 1,
        headerName: "Is Paid",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <BooleanField value={value}/>;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.timeclockId} />
              <ShowButton hideText recordItemId={row.timeclockId} />
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
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
