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
import ICoop from "./types";
import { Box, TextField, Typography } from "@mui/material";

export default function CoopList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "coopId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 100,
      },
      {
        field: "location",
        flex: 1,
        headerName: "Location",
        minWidth: 150, 
      },
      { 
        field: "chickensCount",
        headerName: "Chickens Count #",
        type: "number",
        minWidth: 200, 
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
              <EditButton hideText recordItemId={row.coopId} />
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
  const getRowId: GridRowIdGetter<ICoop> = (row) => row.coopId?.toString();

  return (
    <List title={<Typography variant="h5">Coop</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
//               <DeleteButton hideText recordItemId={row.coopId} />