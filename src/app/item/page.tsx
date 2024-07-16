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
  EmailField,
} from "@refinedev/mui";
import React from "react";
import IItem from "./types";
import { Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";

export default function CoopList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: deptData, isLoading: deptIsLoading, isError: deptLoadingError } = useList({
    resource: "dept",  
  });

  const { data: classData, isLoading: classIsLoading, isError: classLoadingError } = useList({
    resource: "classs",  
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "itemId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "itemName",
        flex: 1,
        headerName: "Name",
        minWidth: 150,
      },
      {
        field: "deptId",
        flex: 1,
        headerName: "Department",
        minWidth: 150,
        valueGetter: ({ row }) => {
          const value = row?.deptId;
          return value;
        },
        renderCell: function render({ value }) {
          return deptIsLoading ? (
            <>Loading...</>
          ) : (
            deptData?.data?.find((item) => item.deptId.toString() === value.toString())?.deptName
          );
        },
      },
      { 
        field: "classId",
        flex: 1,
        headerName: "Class",
        minWidth: 150, 
        valueGetter: ({ row }) => {
          const value = row?.classId;
          return value;
        },
        renderCell: function render({ value }) {
          return classIsLoading ? (
            <>Loading...</>
          ) : (
            classData?.data?.find((item) => item.classId.toString() === value.toString())?.className
          );
        },
      },
      { 
        field: "uom",
        headerName: "Uom",
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
              <EditButton hideText recordItemId={row.itemId} />
              <DeleteButton hideText recordItemId={row.itemId} />
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
  const getRowId: GridRowIdGetter<IItem> = (row) => row.itemId?.toString();

  return (
    <List title={<Typography variant="h5">Item</Typography>}>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
//               <DeleteButton hideText recordItemId={row.coopId} />