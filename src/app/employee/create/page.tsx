"use client";

import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CanAccess, useCreate, useRegister } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { USStates } from "../us-states";

export default function EmployeeCreate() {
  const { mutate: registerUser } = useRegister();

  const { 
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,  
    formState: { errors },
  } = useForm({
    // refineCoreProps: {
    //   successNotification: (data, values, resource) => {
        
    //     const regFields = {
    //       name: values?.firstName + " " + values?.lastName,
    //       email: values?.email,
    //       mobile: values?.mobile,
    //     };

    //     registerUser(regFields);

    //     return {
    //       message: `Post Successfully created with`,
    //       description: "Success with no errors",
    //       type: "success",
    //     };
    //   },
    // },
  });

  const { mutate } = useCreate();

  const { autocompleteProps: roleAutocompleteProps } = useAutocomplete({
    resource: "employeeRole",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.roleDesc,
  });
  
  return (
    <CanAccess>
      <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
          required
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
          required
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
          required
        />
        <TextField
          {...register("mobile")}
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
              <MobileDatePicker 
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
                      error={!!errors.dob}
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
          required
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
          required
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
                  InputLabelProps={{ shrink: true }}
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
          required
        />
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker 
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
                field.onChange(value?.roleId);
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
                  InputLabelProps={{shrink: true}}  
                  required
                />
              )}
            />
          )}
        />
      </Create>
    </CanAccess>
  );
}
