"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
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

interface IEmployeeWage {
  WageId: number;
  EmployeeId: number;
  FarmWorkId: number;
  StartDate: Date;
  EndDate: Date;
  Wage: number;
  WageUOM: string;
  UpdatedBy: string;
  UpdatedOn: Date;
}

export default function EmployeeList() {
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
        field: "WageId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "EmployeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 50,
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
        minWidth: 50,
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
        field: "StartDate",
        flex: 1,
        headerName: "Start Date",
        minWidth: 50,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "EndDate",
        flex: 1,
        headerName: "End Date",
        minWidth: 50,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "Wage",
        headerName: "Wage",
        type: "number",
        minWidth: 80,
      },
      {
        field: "WageUOM",
        headerName: "Wage Unit",
        type: "string",
        minWidth: 100,
      },
      {
        field: "IsActive",
        flex: 1,
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField value={value} />;
        },
      },
      {
        field: "UpdatedBy",
        flex: 1,
        headerName: "Updated By",
        minWidth: 200,
      },
      { 
        field: "UpdatedOn",
        flex: 1,
        headerName: "Updated On",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.WageId} />
              <DeleteButton hideText recordItemId={row.WageId} />
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
  const getRowId: GridRowIdGetter<IEmployeeWage> = (row) => row.WageId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.RoleId} />