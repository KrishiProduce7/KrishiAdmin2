"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { CanAccess, useList } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
  BooleanField,
  EmailField,
} from "@refinedev/mui";
import React from "react";
import IFarmWork from "./types"
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { TextField, Typography } from "@mui/material";

export default function FarmWorkList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "client", 
    }
  });
 
  const { data: categoryData, isLoading: categoryIsLoading, isError } = useList({
    resource: "farmworkCategory",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "farmWorkId",
        headerName: "ID #",
        type: "number",
        minWidth: 50,
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.categoryId;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.categoryId.toString() === value.toString())?.categoryDesc ?? ""
          );
        },
      },
      {
        field: "farmWorkDesc",
        flex: 1,
        headerName: "Description",
        minWidth: 150,
      },
      {
        field: "isActive",
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField 
            value={value}
            trueIcon={<CheckOutlined style={{ color: green[500] }} />}
            falseIcon={<CloseOutlined style={{ color: red[500] }} />}
            />
        }
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
              <EditButton hideText recordItemId={row.farmWorkId} />
              <DeleteButton hideText recordItemId={row.farmWorkId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryIsLoading, categoryData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IFarmWork> = (row) => row.farmWorkId.toString();

  return (
    <CanAccess>
      <List
        title={<Typography variant="h5">Farmwork</Typography>}>
        <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
      </List>
    </CanAccess>
  );
}


// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />