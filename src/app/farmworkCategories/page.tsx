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
} from "@refinedev/mui";
import React from "react";

export default function FarmworkCategoryList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "CategoryId",
        headerName: "Id",
        type: "number",
        minWidth: 30,
      },
      {
        field: "CategoryDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 150,
      },
      {
        field: "IsActive",
        flex: 1,
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField value={value} />;
        },
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
          return <DateField value={value}/>;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.CategoryId} />
              <ShowButton hideText recordItemId={row.CategoryId} />
              <DeleteButton hideText recordItemId={row.CategoryId} />
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
  const getRowId: GridRowIdGetter<FarmworkCategory> = (row) => row.CategoryId.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
