"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  List,
  useDataGrid,
} from "@refinedev/mui";
import React, { useState } from "react";
import ICoop from "./types";
import { Box, TextField, Typography } from "@mui/material";
import { DateCalendar, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export default function EmployeeScheduleList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "coopId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 100,
      },
      {
        field: "location",
        flex: 1,
        headerName: "Location",
        minWidth: 150, 
      },
      { 
        field: "chickensCount",
        headerName: "Chickens Count #",
        type: "number",
        minWidth: 200, 
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
    ],
    []
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<ICoop> = (row) => row.coopId?.toString();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  return (
    <List title={<Typography variant="h5">Employee Schedule</Typography>}>
      <Box display="flex" flexDirection="column" p={2}> 
        <Box display="flex" flexDirection="row" flexGrow={1}>
          <Box flex={1}>
            <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight/>
          </Box>
          <Box ml={1} mt={-15}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </List>
  );
}

// <List title={<Typography variant="h5">Coop</Typography>}>
// <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight />
// </List>

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
//               <DeleteButton hideText recordItemId={row.coopId} />