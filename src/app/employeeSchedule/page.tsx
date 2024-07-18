"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import { DateField, List } from "@refinedev/mui";
import React, { useState, useEffect } from "react";
import IEmployeeSchedule from "./types";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useCustom, useApiUrl } from "@refinedev/core";

export default function EmployeeScheduleList() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [data, setData] = useState([]);

  const API_URL = useApiUrl();

  const { refetch } = useCustom({
    url: `${API_URL}/employeeSchedule`,
    method: 'get',
    config: {
      query: {
        selDay: selectedDate?.toISOString().split('T')[0],
        employeeId: 0,
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await refetch();
      if (response.data) {
        setData(response.data.data);
      }
    };
    fetchData();
  }, [selectedDate, refetch]);
 
  const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date as any);
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "taskId",
        headerName: "ID #",
        type: "number",
        minWidth: 30,
      },
      {
        field: "employeeName",
        flex: 1,
        headerName: "Employee Name",
        minWidth: 100,
      },
      {
        field: "farmworkName",
        flex: 1,
        headerName: "Farm Work",
        minWidth: 150,
      },
      { 
        field: "taskDesc",
        flex: 1,
        headerName: "Task Desc",
        minWidth: 200,
      },
      { 
        field: "taskNotes",
        flex: 1,
        headerName: "Task Notes",
        minWidth: 200,
      },
      { 
        field: "taskPercentComplete",
        flex: 1,
        headerName: "Percent Complete #",
        type: "number",
        minWidth: 150,
      },
      {
        field: "assignedStartDateTime",
        headerName: "Assigned Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return isValidDate(new Date(value)) ? <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/> : "";
        },   
      },
      {
        field: "assignedEndDateTime",
        headerName: "Assigned End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return isValidDate(new Date(value)) ? <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/> : "";
        },
      },
      {
        field: "actualStartDateTime",
        headerName: "Actual Start Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return isValidDate(new Date(value)) ? <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/> : "";
        },
      },
      {
        field: "actualEndDateTime",
        headerName: "Actual End Time",
        minWidth: 150,
        renderCell: function render({ value }) {
          return isValidDate(new Date(value)) ? <DateField value={value} format="MM/DD/YYYY HH:mm:ss"/> : "";
        },
      },
    ],
    []
  );

  // Handlers to increase and decrease the date by 1 day
  const handleIncreaseDate = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      setSelectedDate(newDate);
    }
  };

  const handleDecreaseDate = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      setSelectedDate(newDate);
    }
  };

  const handleRefresh = async () => {
    const response = await refetch();
    if (response.data) {
      setData(response.data.data);
    }
  };

  // Custom getRowId
  const getRowId: GridRowIdGetter<IEmployeeSchedule> = (row) => row.taskId?.toString();

  return (
    <List 
      title={<Typography variant="h5">Employee Schedule</Typography>}
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Box display="flex" flexDirection="row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker 
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
            <ButtonGroup size="large" variant="outlined" aria-label="Large button group">
              <Button onClick={handleRefresh}>
                <RefreshIcon />
              </Button>
              <Button onClick={handleDecreaseDate}>
                <ArrowCircleLeftOutlinedIcon />
              </Button>
              <Button onClick={handleIncreaseDate}>
                <ArrowCircleRightOutlinedIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </>
      )}>
      <DataGrid 
        rows={data} // Provide the data fetched from the API
        getRowId={getRowId} 
        columns={columns} 
        autoHeight
      />
    </List>
  );
}

