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
import IEmployeeTask from "./types";
import { Typography } from "@mui/material";

export default function EmployeeTaskList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: employeeData, isLoading: employeeIsLoading, isError: employeeLoadingError } = useList({
    resource: "employee",
  });

  const { data: farmworkData, isLoading: farmworkIsLoading, isError: farmworkLoadingError } = useList({
    resource: "farmwork",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "taskId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "employeeId",
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
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.firstName + " " +
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.lastName 
          );
        },
      },
      {
        field: "farmWorkId",
        headerName: "Farm Work",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.farmWorkId;
          return value;
        },
        renderCell: function render({ value }) {
          return farmworkIsLoading ? (
            <>Loading...</>
          ) : (
            farmworkData?.data?.find((item) => item.farmWorkId?.toString() === value?.toString())?.farmWorkDesc ?? ""
          );
        },
      },
      {
        field: "taskDesc",
        headerName: "Description",
        minWidth: 200,
      },
      {
        field: "assignedStartDateTime",
        headerName: "Assigned Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/>;
        },
      },
      {
        field: "assignedEndDateTime",
        headerName: "Assigned End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/>;
        },
      },
      {
        field: "actualStartDateTime",
        headerName: "Actual Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/>;
        },
      },
      {
        field: "actualEndDateTime",
        headerName: "Actual End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/>;
        },
      },
      {
        field: "taskPercentComplete",
        headerName: "Percent Complete #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "taskNotes",
        headerName: "Notes",
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
              <EditButton hideText recordItemId={row.taskId} />
              <DeleteButton hideText recordItemId={row.taskId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [employeeIsLoading, employeeData, farmworkIsLoading, farmworkData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployeeTask> = (row) => row.taskId?.toString();

  return ( 
    <List title={<Typography variant="h5">Employee Task</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  ); 
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />