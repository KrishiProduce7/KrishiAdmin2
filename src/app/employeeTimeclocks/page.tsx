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

interface IEmployeeTimeclock {
  TimeclockId: number;
  EmployeeId: number;
  FarmWorkId: number;
  ClockInGeo: any;
  ClockOutGeo: any;
  ClockIn: Date;
  ClockOut: Date;
  Hours: number;
  UpdatedBy: string;
  UpdatedOn: Date;
}

export default function EmployeeTimeclockList() {
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
        field: "EmployeeId",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "ClockInGeo",
        flex: 1,
        headerName: "Clock In Geo",
        minWidth: 50,
      },
      {
        field: "ClockOutGeo",
        flex: 1,
        headerName: "Clock Out Geo",
        minWidth: 50,
      },
      {
        field: "ClockIn",
        flex: 1,
        headerName: "Clock In",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "ClockOut",
        flex: 1,
        headerName: "Clock Out",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "Hours",
        flex: 1,
        headerName: "Hours",
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
  const getRowId: GridRowIdGetter<IEmployeeTimeclock> = (row) => row.TimeclockId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
