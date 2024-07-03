"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { USStates } from "../us-states";

export default function EmployeeCreate() {
  const { 
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,  
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: roleAutocompleteProps } = useAutocomplete({
    resource: "employeeRole",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
          name={"dob"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Date of Birth"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Date of Birth"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.dob} 
                    helperText={(errors as any)?.dob?.message}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
                minDate={new Date('1900-01-01')}
                maxDate={new Date('2023-12-31')}
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
          name={"state"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={USStates}
              onChange={(_, value) => {
                field.onChange(value?.value);
              }}
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
          name={"startDate"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="StartDate"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"StartDate"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.startDate} 
                    helperText={(errors as any)?.startDate?.message}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name={"endDate"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="End Date"
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"End Date"} 
                    margin="normal"
                    variant="outlined" 
                    error={!!(errors as any)?.endDate} 
                    helperText={(errors as any)?.endDate?.message}
                    required
                  />
                )}
                inputFormat="MM/dd/yyyy"
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name={"roleId"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...roleAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.RoleID);
              }} 
              getOptionLabel={(item) => {
                return (
                  roleAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.RoleID?.toString()
                        : item?.toString();
                    const pId = p?.RoleID?.toString();
                    return itemId === pId;
                  })?.RoleDesc ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.RoleID?.toString();
                const valueId =
                  typeof value === "object"   
                    ? value?.RoleID?.toString()
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
    </Create>
  );
}
