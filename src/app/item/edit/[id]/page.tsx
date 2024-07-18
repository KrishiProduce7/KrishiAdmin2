"use client";

import { Box, TextField, Switch, Typography, createFilterOptions, Autocomplete, InputLabel, Select, MenuItem } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { axiosInstance } from "@refinedev/simple-rest";
import { CanAccess, useApiUrl } from "@refinedev/core";

export default function ItemEdit() {
  const {
    saveButtonProps,
    register,
    control,
    setValue,
    formState: { errors },
    refineCore: {
      queryResult,
    }
  } = useForm({});
 
  const record = queryResult?.data?.data;

  const { autocompleteProps: deptAutocompleteProps } = useAutocomplete({
    resource: "dept",
  });

  const deptFilterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.deptName,
  });

  const classFilterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.className,
  });

  const url = useApiUrl();

  const [classAutocompleteProps, setClassAutocompleteProps] = useState([]);

  useEffect(() => {
    const fetchClassData = async (classId: number) => { 
      try {
        const response = await axiosInstance.get(`${url}/classs?classId=${classId}`);
 
        if (response?.data.length > 0) {
          const {data} = response;
          setClassAutocompleteProps(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (record !== undefined && record?.classId > 0)
      fetchClassData(record?.classId);
  }, [record, url]);

  return (
    <CanAccess>
      <Edit 
        title={<Typography variant="h5">Edit Item</Typography>}
        saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <TextField
            {...register("itemName", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.itemName}
            helperText={(errors as any)?.itemName?.message}
            margin="normal"  
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Name"}
            name="itemName"
            required  
          />
          <Controller
            control={control}
            name="deptId"
            rules={{ required: "This field is required" }}
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete 
                {...deptAutocompleteProps}
                {...field}
                onChange={async (_, value) => {
                  field.onChange(value?.deptId);
                  setValue('classId', 0);

                  const response = await axiosInstance.get(`${url}/classs/dept?deptId=${value.deptId}`);

                  if (response?.data.length > 0) {
                    const {data} = response;
                    setClassAutocompleteProps(data);
                  }
                }}
                onInputChange={(_, value) => {}}
                filterOptions={deptFilterOptions}              
                getOptionLabel={(item) => {
                  return (
                    deptAutocompleteProps?.options?.find((p) => {
                      const itemId =
                        typeof item === "object"
                          ? item?.deptId?.toString()
                          : item?.toString();
                      const pId = p?.deptId?.toString();
                      return itemId === pId;
                    })?.deptName
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  const optionId = option?.deptId?.toString();
                  const valueId =
                    typeof value === "object"
                      ? value?.deptId?.toString()
                      : value?.toString();
                  return value === undefined || optionId === valueId;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Department"}
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.deptId} 
                    helperText={(errors as any)?.deptId?.message}
                    InputLabelProps={{shrink: true}}
                    required
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="classId"
            rules={{ required: "This field is required" }}
            defaultValue={null as any} 
            render={({ field }) => (
              <Autocomplete 
                {...field}
                onChange={(_, value) => {
                  field.onChange(value?.classId);
                }}
                options={classAutocompleteProps}
                onInputChange={(_, value) => {}}
                filterOptions={classFilterOptions}              
                getOptionLabel={(item) => {
                  return (
                    classAutocompleteProps?.find((p) => {
                      const itemId =
                        typeof item === "object"
                          ? item?.classId?.toString()
                          : item?.toString();
                      const pId = p?.classId?.toString();
                      return itemId === pId;
                    })?.className ?? ''
                  ); 
                }}
                isOptionEqualToValue={(option, value) => {
                  const optionId = option?.classId?.toString();
                  const valueId =
                    typeof value === "object"
                      ? value?.classId?.toString()
                      : value?.toString();
                  return value === undefined || optionId === valueId;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Class"}
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.classId} 
                    helperText={(errors as any)?.classId?.message}
                    InputLabelProps={{ shrink: true}}
                    required
                  />
                )}
              />
            )}
          />
          <InputLabel shrink>Uom</InputLabel>
          <Controller 
            name="uom"
            rules={{ required: "This field is required" }}
            control={control}
            defaultValue={"Box"}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={field?.value || "Box"}
                  label={"Uom"}
                >
                  <MenuItem value="Box">Box</MenuItem>
                  <MenuItem value="Dozen">Dozen</MenuItem>
                </Select>
              );
            }}
          />
        </Box>
      </Edit>
    </CanAccess>
  );
}
