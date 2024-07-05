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
} from "@refinedev/mui";
import React from "react";

interface IFarmExpense {
  expenseId: number,
  expenseDate: Date,
  itemName: string,
  totalQty: number,
  totalAmount: number,
}

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
        headerName: "Id",
        type: "number",
        minWidth: 30,
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
        flex: 1,
        headerName: "Total Quantity",
        minWidth: 100, 
      },      
      {
        field: "totalAmount",
        flex: 1,
        headerName: "Total Amount",
        minWidth: 100, 
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
          return <DateField value={value} format="YYYY/MM/DD hh:mm:ss"/>;
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
              <ShowButton hideText recordItemId={row.expenseId} />
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
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />