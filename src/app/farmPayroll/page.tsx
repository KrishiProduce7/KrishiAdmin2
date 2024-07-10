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
  BooleanField,
  EmailField,
} from "@refinedev/mui";
import React from "react";
import IFarmPayroll from "./types";
import { TextField, Typography } from "@mui/material";

export default function FarmPayrollList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: employeeData, isLoading: employeeIsLoading, isError: employeeLoadingError } = useList({
    resource: "employee",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "payrollId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "employeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.employeeId;
          return value;
        },
        renderCell: function render({ value }) {
          return employeeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeData?.data?.find((item) => item.employeeId?.toString() === value?.toString())?.firstName + " " +
            employeeData?.data?.find((item) => item.employeeId?.toString() === value?.toString())?.lastName
          );
        },
      },
      {
        field: "payStartDate",
        flex: 1,
        headerName: "Pay Start Date",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "payEndDate",
        flex: 1,
        headerName: "Pay End Date",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "paidOn",
        flex: 1,
        headerName: "Paid On",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "amountPaid",
        headerName: "Amount Paid",
        minWidth: 150,
        type: "number",
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
              <EditButton hideText recordItemId={row.payrollId} />
              <DeleteButton hideText recordItemId={row.payrollId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [employeeIsLoading, employeeData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IFarmPayroll> = (row) => row.payrollId?.toString();

  return (
    <List title={<Typography variant="h5">Farm Payroll</Typography>}> 
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />