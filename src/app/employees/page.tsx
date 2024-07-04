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

interface IEmployee {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Mobile: string;
  DOB: Date;
  StartDate: Date;
  EndDate: Date;
  RoleId: number;
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
 
  const { data: roleData, isLoading: roleIsLoading, isError } = useList({
    resource: "employeeRole",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "EmployeeId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "FirstName",
        flex: 1,
        headerName: "First Name",
        minWidth: 100,
      },
      {
        field: "LastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 100,
      },
      {
        field: "Email",
        flex: 1,
        headerName: "Email",
        minWidth: 150,
      },
      {
        field: "Mobile",
        flex: 1,
        headerName: "Mobile",
        minWidth: 100,
      },
      {
        field: "DOB",
        flex: 1,
        headerName: "DOB",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "Street",
        flex: 1,
        headerName: "Street",
        minWidth: 100,
      },
      {
        field: "City",
        flex: 1,
        headerName: "City",
        minWidth: 100,
      },
      {
        field: "State",
        flex: 1,
        headerName: "State",
        minWidth: 100,
      },
      {
        field: "Zip",
        flex: 1,
        headerName: "Zip",
        minWidth: 100,
      },
      {
        field: "StartDate",
        flex: 1,
        headerName: "Start Date",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "EndDate",
        flex: 1,
        headerName: "End Date",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "RoleId",
        flex: 1,
        headerName: "Role",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.RoleId;
          console.log("employee valuegetter", value);
          return value;
        },
        renderCell: function render({ value }) {
          console.log("employee renderCell", value);
 
          return roleIsLoading ? (
            <>Loading...</>
          ) : (
            roleData?.data?.find((item) => item.RoleId?.toString() === value?.toString())?.RoleDesc ?? "" 
          );
        },
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
              <EditButton hideText recordItemId={row.EmployeeId} />
              <DeleteButton hideText recordItemId={row.EmployeeId} />
            </>
          ); 
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [roleIsLoading, roleData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployee> = (row) => row.EmployeeId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.RoleId} />
