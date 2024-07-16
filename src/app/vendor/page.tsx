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
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { green, red } from "@mui/material/colors"; 
import { Box, Typography } from "@mui/material";
import IVendor from "./types"

export default function CoopList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "vendorId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "vendorName",
        flex: 1,
        headerName: "Vendor Name",
        minWidth: 150,
      },
      {
        field: "url",
        flex: 1,
        headerName: "Url",
        minWidth: 100, 
      },
      {
        field: "contactName",
        flex: 1,
        headerName: "Contact Name",
        minWidth: 100, 
      },
      {
        field: "contactEmail",
        type: "email",
        headerName: "Contact Email",
        minWidth: 100, 
      },
      {
        field: "contactPhone",  
        headerName: "Contact Phone",
        minWidth: 100, 
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
              <EditButton hideText recordItemId={row.vendorId} />
              <DeleteButton hideText recordItemId={row.vendorId} />
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
  const getRowId: GridRowIdGetter<IVendor> = (row) => row.vendorId?.toString();

  return (
    <List title={<Typography variant="h5">Vendor</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />