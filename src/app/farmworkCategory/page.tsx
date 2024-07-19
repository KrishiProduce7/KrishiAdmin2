"use client";

import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { CanAccess } from "@refinedev/core";
import {
  BooleanField,
  DateField,
  DeleteButton,
  EditButton,
  List,
  useDataGrid
} from "@refinedev/mui";
import React from "react";
import IFarmWorkCategory from "./types";

export default function FarmworkCategoryList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "categoryId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "categoryDesc",
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
              <EditButton hideText recordItemId={row.categoryId} />
              <DeleteButton hideText recordItemId={row.categoryId} />
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
  const getRowId: GridRowIdGetter<IFarmWorkCategory> = (row) => row.categoryId?.toString();

  return (
    <CanAccess>
      <List 
        title={<Typography variant="h5">Farmwork Category</Typography>}>
        <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
      </List>
    </CanAccess>      
  );
}
 
// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />