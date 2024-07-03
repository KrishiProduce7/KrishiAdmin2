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

interface IFarmWork {
  FarmWorkID: number;
  FarmWorkDesc: string;
  CategoryId: number;
  IsActive: number;
  UpdatedBy: string;
  UpdatedOn: Date;
}

export default function FarmWorkList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "client",
    }
  });
 
  const { data: categoryData, isLoading: categoryIsLoading, isError } = useList({
    resource: "farmworksCategory",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "FarmWorkID",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "CategoryId",
        flex: 1,
        headerName: "Category",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.CategoryId;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.CategoryId === value?.CategoryId)?.CategoryDesc
          );
        },
      },
      {
        field: "FarmWorkDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 150,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
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
    [categoryData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IFarmWork> = (row) => row.FarmWorkID.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}
