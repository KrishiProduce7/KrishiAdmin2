"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  DateField,
  useDataGrid,
  EmailField,
} from "@refinedev/mui";
import React from "react";
import IFarmSale from "./types";
import { Box, TextField, Typography } from "@mui/material";

export default function FarmSaleList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: customerData, isLoading: customerIsLoading } = useList({
    resource: "customer",
  });

  const { data: itemData, isLoading: itemIsLoading } = useList({
    resource: "item",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "saleId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "customerId",
        flex: 1,
        headerName: "Customer",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.customerId;
          return value;
        },
        renderCell: function render({ value }) {
          return customerIsLoading ? (
            <>Loading...</>
          ) : (
            customerData?.data?.find((item) => item.customerId?.toString() === value?.toString())?.customerName ?? "" 
          );
        },
      },
      {
        field: "saleDate",
        flex: 1,
        headerName: "Sale Date",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "saleQty",
        headerName: "Sale Quantity #",
        type: "number",
        minWidth: 100, 
      },      
      {
        field: "saleDollar",
        headerName: "Sale Dollar #",
        type: "number",
        minWidth: 100, 
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
              <EditButton hideText recordItemId={row.saleId} />
              <DeleteButton hideText recordItemId={row.saleId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [customerIsLoading, customerData, itemIsLoading, itemData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IFarmSale> = (row) => row.saleId?.toString();

  return (
    <List title={<Typography variant="h5">Farm Sale</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />