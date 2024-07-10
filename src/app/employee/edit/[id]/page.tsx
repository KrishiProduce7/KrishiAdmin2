"use client";

import { Autocomplete, Box, Select, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { USStates } from "@app/employee/us-states";
import { createFilterOptions } from "@mui/material";

export default function EmployeeEdit() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: roleAutocompleteProps } = useAutocomplete({
    resource: "employeeRole",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.roleDesc,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("firstName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.firstName}
          helperText={(errors as any)?.firstName?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"First Name"}
          name="firstName"
        />
        <TextField
          {...register("lastName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.lastName}
          helperText={(errors as any)?.lastName?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Last Name"}
          name="lastName"
        />
        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Email"}
          name="email"
        />
        <TextField
          {...register("mobile", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.mobile}
          helperText={(errors as any)?.mobile?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Mobile"}
          name="mobile"
        />
        <Controller
          control={control}
          name="dob"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Date of Birth"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params}
                      margin="normal" 
                      variant="outlined"
                      error={!!errors.startDate}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  )
                }}
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          {...register("street", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.street}
          helperText={(errors as any)?.street?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Street"}
          name="street"
        />
        <TextField
          {...register("city", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.city}
          helperText={(errors as any)?.city?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"City"}
          name="city"
        />
        <Controller
          control={control}
          name="state"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={USStates}
              onChange={(_, value) => {
                field.onChange(value?.value);
              }}
              onInputChange={(_, value) => {}}
              filterOptions={filterOptions}              
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.value?.toString();
                const valueId = 
                  typeof value === "object"   
                    ? value?.value?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              getOptionLabel={(item) => {
                return (
                  USStates?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.value?.toString()
                        : item?.toString();
                    const pId = p?.value?.toString();
                    return itemId === pId;
                  })?.label ?? ""
                );
              }}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  label="Select a state" 
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.state} 
                  helperText={(errors as any)?.state?.message}
                  required
                />}
            />
          )}
        />
        <TextField
          {...register("zip", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.zip}
          helperText={(errors as any)?.zip?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Zip"}
          name="zip"
        />
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Start Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params} 
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      required 
                    />
                  )
                }}
              />
            </LocalizationProvider>
          )}
        />
        {/* <Controller
          control={control}
          name="endDate"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="End Date"
                value={field.value || null}
                onChange={(newValue) => field.onChange(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.endDate}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  )
                }}
              />
            </LocalizationProvider>
          )}
        /> */}
        <Controller
          control={control}
          name="roleId"
          rules={{ required: "This field is required" }}
          
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...roleAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.roleId);
              }} 
              onInputChange={(_, value) => {}}
              filterOptions={filterOptions}              
              getOptionLabel={(item) => {
                return (
                  roleAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.roleId?.toString()
                        : item?.toString();
                    const pId = p?.roleId?.toString();
                    return itemId === pId;
                  })?.roleDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.roleId?.toString();
                const valueId =
                  typeof value === "object"   
                    ? value?.roleId?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Role"}
                  margin="normal"
                  variant="outlined" 
                  error={!!(errors as any)?.roleId} 
                  helperText={(errors as any)?.roleId?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Edit>
  );
}
