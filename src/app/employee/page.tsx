"use client";

import { green, red } from "@mui/material/colors";
import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import {
  BooleanField,
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import IEmployee from "./types";
import { Box, TextField, Tooltip, Typography } from "@mui/material";

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
        headerName: "ID #",
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
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField 
            value={value}
            trueIcon={<CheckOutlined style={{ color: green[500] }} />}
            falseIcon={<CloseOutlined style={{ color: red[500] }} />}
            />
        }
      }, 
      {
        field: "updatedBy",
        headerName: "Updated By",
        minWidth: 150,
        type: "email",
      },
      {
        field: "updatedOn",
        headerName: "Updated On",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MM/DD/YYYY hh:mm:ss"/>;
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
    <List title={<Typography variant="h5">Employee</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
