"use client";

import { Autocomplete, Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Create, SaveButton, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { createFilterOptions } from "@mui/material";
import { useEffect, useRef } from "react";
import { useGetIdentity } from "@refinedev/core";
import IEmployee from "@app/employee/types";

interface IGeoLocation
{
  latitude: number,
  longitude: number
}

export default function EmployeeTimeclockCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({});

  const { data: user } = useGetIdentity<IEmployee>();

  const onFinishHandler = (data : any) => {
    const adapterDate = new AdapterDateFns();
    console.log(user);

    onFinish({
      ...data,
      employeeId: user?.employeeId, 
      clockInGeo: `${geoLocation.current.latitude},${geoLocation.current.longitude}`,
      //      clockIn: adapterDate.date(new Date()), // Correct usage to get the current date
      // clockOutGeo: ``,
      // clockOut: ``,
      // totalHours: 0,
    });
  };

  const geoLocation = useRef<IGeoLocation>({
    latitude: 0,
    longitude: 0,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          geoLocation.current.latitude = position.coords.latitude;
          geoLocation.current.longitude = position.coords.longitude;
        }
      );
    }
  };

  // Get location when the component mounts
  useEffect(() => {
    getLocation();
  }, []);

  const { autocompleteProps: taskAutocompleteProps } = useAutocomplete({
    resource: "employeeTask",
  });
 
  const filterOptionsTask = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.taskDesc,
  });

  // saveButtonProps={{ ...saveButtonProps, children: 'Clock In', }}>
  return (
    <Create 
      title={<Typography variant="h5">Clock In</Typography>}
      isLoading={formLoading} 
      saveButtonProps={{ ...saveButtonProps, children: 'Clock In', onClick: handleSubmit(onFinishHandler) }}> 
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="taskId"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (   
            <Autocomplete
              {...taskAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.taskId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptionsTask}              
              getOptionLabel={(item) => {
                return (
                  taskAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.taskId?.toString()
                        : item?.toString();
                    const pId = p?.taskId?.toString();
                    return itemId === pId;
                  })?.taskDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.taskId?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.taskId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Employee Task"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.taskId} 
                  helperText={(errors as any)?.taskId?.message}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
}
