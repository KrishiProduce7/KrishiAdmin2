"use client";

import { Autocomplete, Box, createFilterOptions, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { axiosInstance } from "@refinedev/simple-rest";
import { useApiUrl } from "@refinedev/core";
import IItem from "../types";

export default function ItemCreate() {
  const { 
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,  
    setValue,
    formState: { errors },
  } = useForm({});

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

  const [classAutocompleteProps, setClassAutocompleteProps] = useState([{}]);

  return (
    <CanAccess>
      <Create 
        title={<Typography variant="h5">Create Item</Typography>}
        isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
                setValue('classId', 0);
                
                field.onChange(value?.deptId);
                
                const response = await axiosInstance.get(`${url}/classs/dept?deptId=${value.deptId}`);

                console.log(response);

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
      </Create>
    </CanAccess>
  );
}
