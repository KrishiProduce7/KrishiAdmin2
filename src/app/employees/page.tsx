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
  employeeId: number;
  firstName: string;
  lastName: string;
  mobile: string;
  dob: Date;
  startDate: Date;
  endDate: Date;
  roleId: number;
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
 
  const { data: roleData, isLoading: roleIsLoading, isError } = useList({
    resource: "employeeRole",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "employeeId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "firstName",
        flex: 1,
        headerName: "First Name",
        minWidth: 100,
      },
      {
        field: "lastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 100,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 150,
      },
      {
        field: "mobile",
        flex: 1,
        headerName: "Mobile",
        minWidth: 100,
      },
      {
        field: "dob",
        flex: 1,
        headerName: "DOB",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "street",
        flex: 1,
        headerName: "Street",
        minWidth: 100,
      },
      {
        field: "city",
        flex: 1,
        headerName: "City",
        minWidth: 100,
      },
      {
        field: "state",
        flex: 1,
        headerName: "State",
        minWidth: 100,
      },
      {
        field: "zip",
        flex: 1,
        headerName: "Zip",
        minWidth: 100,
      },
      {
        field: "startDate",
        flex: 1,
        headerName: "Start Date",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "endDate",
        flex: 1,
        headerName: "End Date",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "roleId",
        flex: 1,
        headerName: "Role",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.roleId;
          return value;
        },
        renderCell: function render({ value }) {
          return roleIsLoading ? (
            <>Loading...</>
          ) : (
            roleData?.data?.find((item) => item.roleId?.toString() === value?.toString())?.roleDesc ?? "" 
          );
        },
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
              <EditButton hideText recordItemId={row.employeeId} />
              <DeleteButton hideText recordItemId={row.employeeId} />
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
  const getRowId: GridRowIdGetter<IEmployee> = (row) => row.employeeId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
