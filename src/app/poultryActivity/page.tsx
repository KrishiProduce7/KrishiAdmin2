"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { CanAccess, useList } from "@refinedev/core";
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
import IPoultryActivity from "./types";
import { TextField, Typography } from "@mui/material";

export default function PoultryActivityList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const { data: coopData, isLoading: coopIsLoading, isError: coopLoadingError } = useList({
    resource: "coop",
  });

  const { data: employeeData, isLoading: employeeIsLoading, isError:employeeLoadingError } = useList({
    resource: "employee",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "activityId",
        headerName: "ID #",
        type: "number", 
        minWidth: 30,
      },
      {
        field: "coopId",
        flex: 1,
        headerName: "Coop",
        minWidth: 100,
        valueGetter: ({ row }) => {
          const value = row?.coopId;
          return value;
        },
        renderCell: function render({ value }) {
          return coopIsLoading ? (
            <>Loading...</>
          ) : (
            coopData?.data?.find((item) => item.coopId?.toString() === value?.toString())?.name ?? "" 
          );
        },
      },
      {
        field: "employeeId",
        flex: 1,
        headerName: "Employee",
        minWidth: 150,
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
        field: "day",
        headerName: "Day",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value}/>;
        },
      },
      {
        field: "feedBagsUsed",
        headerName: "Feed Bags Used #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "mediumEggsPicked",
        headerName: "Medium Eggs Picked #",
        type: "number",
        minWidth: 200,
      },
      {
        field: "largeEggsPicked",
        headerName: "Large Eggs Picked #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "xLargeEggsPicked",
        headerName: "Extra Large Eggs Picked #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "eggsWashed",
        headerName: "Eggs Washed #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "eggsBroken",
        headerName: "Eggs Broken #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "nestboxEggs",
        headerName: "Nestbox Eggs #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "floorEggs",
        headerName: "Floor Eggs #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "cleanEggs",
        headerName: "Clean Eggs #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "dirtyEggs",
        headerName: "Dirty Eggs #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "mediumEggsPacked",
        headerName: "Medium Eggs Packed #",
        type: "number",
        minWidth: 150,
      },        
      {
        field: "largeEggsPacked",
        headerName: "Large Eggs Packed #",
        type: "number",
        minWidth: 150,
      },     
      {
        field: "xLargeEggsPacked",
        headerName: "Extra Large Eggs Packed #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "manureBags",
        headerName: "Manure Bags #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "chickensDead",
        headerName: "Chickens Dead #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "deathReason",
        headerName: "Death Reason",
        type: "string",
        minWidth: 150,
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
              <EditButton hideText recordItemId={row.activityId} />
              <DeleteButton hideText recordItemId={row.activityId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [coopIsLoading, coopData, employeeIsLoading, employeeData]
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<IPoultryActivity> = (row) => row.activityId?.toString();
   
  return (
    <CanAccess>
      <List title={<Typography variant="h5">Poultry Activity</Typography>}>
        <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
      </List>
    </CanAccess>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />