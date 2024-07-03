"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

interface IEmployeeWage {
  WageId: number;
  EmployeeId: number;
  FarmWorkId: number;
  StartDate: Date;
  EndDate: Date;
  Wage: number;
  WageUnit: string;
  UpdatedBy: string;
  UpdatedOn: Date;
}

export default function EmployeeList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "client",
    }
  });
 
  const { data: roleData, isLoading: roleIsLoading, isError } = useList({
    resource: "employeeRoles",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "WageId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "EmployeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 50,
      },
      {
        field: "FarmWorkId",
        flex: 1,
        headerName: "FarmWork",
        minWidth: 50,
      },
      {
        field: "StartDate",
        flex: 1,
        headerName: "Start Date",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "Wage",
        headerName: "Wage",
        type: "number",
        minWidth: 50,
      },
      {
        field: "WageUnit",
        headerName: "WageUnit",
        type: "string",
        minWidth: 50,
      },
      {
        field: "UpdatedBy",
        flex: 1,
        headerName: "Updated By",
        minWidth: 200,
      },
      {
        field: "UpdatedOn",
        flex: 1,
        headerName: "Updated On",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.FarmWorkID} />
              <ShowButton hideText recordItemId={row.FarmWorkID} />
              <DeleteButton hideText recordItemId={row.FarmWorkID} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [roleData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployeeWage> = (row) => row.WageId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
