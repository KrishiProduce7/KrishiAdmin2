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
  wageId: number;
  employeeId: number;
  farmWorkId: number;
  startDate: Date;
  endDate: Date;
  wage: number;
  wageUom: string;
  updatedBy: string;
  updatedOn: Date;
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
        field: "wageId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "employeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 50,
        valueGetter: ({ row }) => {
          const value = row?.employeeId;
          return value;
        },
        renderCell: function render({ value }) {
          return employeeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.firstName + " " 
            + employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.lastName
          );
        },
      },
      {
        field: "farmWorkId",
        flex: 1,      
        headerName: "Farm Work",
        minWidth: 50,
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
        field: "startDate",
        flex: 1,
        headerName: "Start Date",
        minWidth: 50,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "endDate",
        flex: 1,
        headerName: "End Date",
        minWidth: 50,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "wage",
        headerName: "Wage",
        type: "number",
        minWidth: 80,
      },
      {
        field: "wageUom",
        headerName: "Wage Unit",
        type: "string",
        minWidth: 100,
      },
      {
        field: "isActive",
        flex: 1,
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField value={value} />;
        },
      },
      {
        field: "updatedBy",
        flex: 1,
        headerName: "Updated By",
        minWidth: 200,
      },
      { 
        field: "updatedOn",
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
              <EditButton hideText recordItemId={row.wageId} />
              <DeleteButton hideText recordItemId={row.wageId} />
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
  const getRowId: GridRowIdGetter<IEmployeeWage> = (row) => row.wageId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />