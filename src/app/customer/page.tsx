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
import ICustomer from "./types";

export default function CustomerList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "customerId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "customerName",
        flex: 1,
        headerName: "Name",
        minWidth: 150,
      },
      {
        field: "customerType",
        headerName: "Type",
        minWidth: 100, 
      },
      {
        field: "email",
        flex: 1,
        type: "email",
        headerName: "Email",
        minWidth: 150, 
      },
      {
        field: "phone",  
        headerName: "Phone",
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
              <EditButton hideText recordItemId={row.customerId} />
              <DeleteButton hideText recordItemId={row.customerId} />
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
  const getRowId: GridRowIdGetter<ICustomer> = (row) => row.customerId?.toString();

  return (
    <List title={<Typography variant="h5">Customer</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />