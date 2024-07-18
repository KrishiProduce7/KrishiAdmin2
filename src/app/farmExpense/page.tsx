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
import IFarmExpense from "./types";
import { Box, TextField, Typography } from "@mui/material";

export default function FarmExpenseList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: vendorData, isLoading: vendorIsLoading, isError } = useList({
    resource: "vendor",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "expenseId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "expenseType",
        headerName: "Type",
        minWidth: 50,
      },
      {
        field: "vendorId",
        flex: 1,
        headerName: "Vendor",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.vendorId;
          return value;
        },
        renderCell: function render({ value }) {
          return vendorIsLoading ? (
            <>Loading...</>
          ) : (
            vendorData?.data?.find((item) => item.vendorId?.toString() === value?.toString())?.vendorName ?? "" 
          );
        },
      },
      {
        field: "expenseDate",
        flex: 1,
        headerName: "Expense Date",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "itemName",
        flex: 1,
        headerName: "Item Name",
        minWidth: 100, 
      },
      {
        field: "totalQty",
        headerName: "Total Quantity",
        type: "number",
        minWidth: 100, 
      },      
      {
        field: "totalAmount",
        headerName: "Total Amount",
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
              <EditButton hideText recordItemId={row.expenseId} />
              <DeleteButton hideText recordItemId={row.expenseId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [vendorIsLoading, vendorData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IFarmExpense> = (row) => row.expenseId?.toString();

  return (
    <List title={<Typography variant="h5">Farm Expense</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />