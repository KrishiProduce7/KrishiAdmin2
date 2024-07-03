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
} from "@refinedev/mui";
import React from "react";

interface IEmployeeRole
{
  RoleID: number;
  RoleName: string;
  RoleDescription: string;
  UpdatedBy: string;
  UpdatedOn: string;
}
export default function EmployeeRoleList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "RoleID",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "RoleName",
        flex: 1,
        headerName: "Role Name",
        minWidth: 150,
      },
      {
        field: "RoleDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 150,
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
        minWidth: 200,
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
              <EditButton hideText recordItemId={row.RoleID} />
              <DeleteButton hideText recordItemId={row.RoleID} />
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
  const getRowId: GridRowIdGetter<IEmployeeRole> = (row) => row.RoleID?.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.RoleID} />
