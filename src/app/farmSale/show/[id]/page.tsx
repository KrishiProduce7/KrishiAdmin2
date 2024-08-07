"use client";

import { Stack, Typography } from "@mui/material";
import { CanAccess, useShow } from "@refinedev/core";
import { DateField, Show, TextFieldComponent as TextField } from "@refinedev/mui";

export default function FarmExpenseShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  return (
    <CanAccess>
      <Show title={<Typography variant="h5">Show Farm Expense</Typography>} isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {"ID #"}
          </Typography>
          <TextField value={record?.expenseId} />

          <Typography variant="body1" fontWeight="bold">
            {"Expense Date"}
          </Typography>
          <DateField value={record?.expenseDate} />

          <Typography variant="body1" fontWeight="bold">
            {"Item Name"}
          </Typography>
          <TextField value={record?.itemName} />

          <Typography variant="body1" fontWeight="bold">
            {"Total Quantity"}
          </Typography>
          <TextField value={record?.totalQty} />

          <Typography variant="body1" fontWeight="bold">
            {"Total Amount"}
          </Typography>
          <TextField value={record?.totalAmount} />

          <Typography variant="body1" fontWeight="bold">
            {"Updated By"}
          </Typography>
          <TextField value={record?.updatedBy} />

          <Typography variant="body1" fontWeight="bold">
            {"Updated On"}
          </Typography> 
          <DateField value={record?.updatedOn} format="YYYY/MM/DD hh:mm:ss"/>

        </Stack>
      </Show>
    </CanAccess>
  );
}
