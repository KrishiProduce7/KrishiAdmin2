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
} from "@refinedev/mui";
import React from "react";

interface IFarmPayroll {
  payrollId: number,
  employeeId: number,
  payStartDate: Date,
  payEndDate: Date,
  paiedOn: boolean,
  amountPaid: number,
  updatedBy: string,
  updatedOn: Date
}

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
        headerName: "Id",
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
        flex: 1,
        headerName: "Amount Paid",
        minWidth: 150,
        type: "number",
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
              <EditButton hideText recordItemId={row.payrollId} />
              <ShowButton hideText recordItemId={row.payrollId} />
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
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />