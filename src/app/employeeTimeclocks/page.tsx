"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import {
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
  TimeclockId: number;
  EmployeeId: number;
  FarmWorkId: number;
  ClockInGeo: string;
  ClockOutGeo: string;
  ClockIn: Date;
  ClockOut: Date;
  Hours: number;
  UpdatedBy: string;
  UpdatedOn: Date;
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
        field: "TimeclockId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "EmployeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.EmployeeId;
          return value;
        },
        renderCell: function render({ value }) {
          return employeeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeData?.data?.find((item) => item.EmployeeId.toString() === value.toString())?.FirstName + " " 
            + employeeData?.data?.find((item) => item.EmployeeId.toString() === value.toString())?.LastName
          );
        },
      },
      {
        field: "FarmWorkId",
        flex: 1,
        headerName: "Farm Work",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.FarmWorkId;
          return value;
        },
        renderCell: function render({ value }) {
          return farmworkIsLoading ? (
            <>Loading...</>
          ) : (
            farmworkData?.data?.find((item) => item.FarmWorkId.toString() === value.toString())?.FarmWorkDesc ?? ""
          );
        },
      },
      {
        field: "ClockInGeo",
        flex: 1,
        headerName: "Clock In Geo",
        minWidth: 150,
      },
      {
        field: "ClockOutGeo",
        flex: 1,
        headerName: "Clock Out Geo",
        minWidth: 150,
      },
      {
        field: "ClockIn",
        flex: 1,
        headerName: "Clock In",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "ClockOut",
        flex: 1,
        headerName: "Clock Out",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "TotalHours",
        flex: 1,
        headerName: "Total Hours",
        minWidth: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.TimeclockId} />
              <DeleteButton hideText recordItemId={row.TimeclockId} />
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
  const getRowId: GridRowIdGetter<IEmployeeTimeclock> = (row) => row.TimeclockId?.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
