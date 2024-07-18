"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  DateField,
  useDataGrid,
  BooleanField,
  EmailField,
} from "@refinedev/mui";
import React from "react";
import IEmployeeRole from "./types";
import { TextField, Typography } from "@mui/material";
import { CanAccess } from "@refinedev/core";

export default function EmployeeRoleList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "roleId",
        headerName: "ID #",
        type: "number",
        minWidth: 50,
      },
      {
        field: "roleName",
        flex: 1,
        headerName: "Role Name",
        minWidth: 150,
      },
      {
        field: "roleDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 150,
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
              <EditButton hideText recordItemId={row.roleId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployeeRole> = (row) => row.roleId?.toString();

  return (
    <CanAccess>
      <List
        title={<Typography variant="h5">Employee Role</Typography>}>
        <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
      </List>
    </CanAccess>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
// <DeleteButton hideText recordItemId={row.roleId} />