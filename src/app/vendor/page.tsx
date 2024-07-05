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

interface IVendor {
  vendorId: number,
  vendorName: string,
  url: string,
  isActive: boolean,
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  updatedBy: string,
  updatedOn: Date
}

export default function CoopList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "vendorId",
        headerName: "Id",
        type: "number",
        minWidth: 30,
      },
      {
        field: "vendorName",
        flex: 1,
        headerName: "Vendor Name",
        minWidth: 150,
      },
      {
        field: "url",
        flex: 1,
        headerName: "Url",
        minWidth: 100, 
      },
      {
        field: "contactName",
        flex: 1,
        headerName: "Contact Name",
        minWidth: 100, 
      },
      {
        field: "contactEmail",
        flex: 1,
        headerName: "Contact Email",
        minWidth: 100, 
      },
      {
        field: "contactPhone",
        flex: 1,
        headerName: "Contact Phone",
        minWidth: 100, 
      },
      {
        field: "isActive",
        flex: 1,
        headerName: "Active",
        minWidth: 50, 
        renderCell: function render({ value }) {
          return <BooleanField value={value} />;
        },
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
              <EditButton hideText recordItemId={row.vendorId} />
              <ShowButton hideText recordItemId={row.vendorId} />
              <DeleteButton hideText recordItemId={row.vendorId} />
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
  const getRowId: GridRowIdGetter<IVendor> = (row) => row.vendorId?.toString();

  return (
    <List>
      <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />