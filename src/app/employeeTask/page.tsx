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

interface IEmployeeTask {
  taskId: number,
  employeeId: number,
  farmworkId: number,
  taskDesc: string,
  assignedStartDateTime: Date,
  assignedEndDateTime: Date,
  actualStartDateTime: Date,
  actualEndDateTime: Date
  taskPercentComplete: number,
  taskNotes: string
  isActive: number,
  updatedBy: string,
  updatedOn: Date
}

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
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.firstName + " " +
            employeeData?.data?.find((item) => item.employeeId.toString() === value.toString())?.lastName 
          );
        },
      },
      {
        field: "farmworkId",
        flex: 1,
        headerName: "Farm Work",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.farmworkId;
          return value;
        },
        renderCell: function render({ value }) {
          return employeeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeData?.data?.find((item) => item.farmworkId?.toString() === value?.toString())?.farmWorkDesc ?? ""
          );
        },
      },
      {
        field: "taskDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 200,
      },
      {
        field: "assignedStartDateTime",
        flex: 1,
        headerName: "Assigned Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "assignedEndDateTime",
        flex: 1,
        headerName: "Assigned End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "actualStartDateTime",
        flex: 1,
        headerName: "Actual Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "actualEndDateTime",
        flex: 1,
        headerName: "Actual End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} format="YYYY/MM/DD HH:mm:ss"/>;
        },
      },
      {
        field: "taskPercentComplete",
        headerName: "Percent Complete",
        type: "number",
        minWidth: 200,
      },
      {
        field: "taskNotes",
        flex: 1,
        headerName: "Notes",
        minWidth: 200,
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
              <EditButton hideText recordItemId={row.taskId} />
              <ShowButton hideText recordItemId={row.taskId} />
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
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />