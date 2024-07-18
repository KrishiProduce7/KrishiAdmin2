"use client";

import { Stack, Typography } from "@mui/material";
import { CanAccess, useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
  BooleanField
} from "@refinedev/mui";

export default function FarmWorkShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "farmworkCategory",
    id: record?.categoryId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <CanAccess>
      <Show 
        title={<Typography variant="h5">Show Farmwork</Typography>}
        isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {"ID"}
          </Typography>
          <TextField value={record?.farmWorkId} />

          <Typography variant="body1" fontWeight="bold">
            {"Category"}
          </Typography>
          {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.categoryDesc ?? "Not selected"}</>}

          <Typography variant="body1" fontWeight="bold">
            {"Description"}
          </Typography>
          <TextField value={record?.farmWorkDesc} />

          <Typography variant="body1" fontWeight="bold">
            {"Active"}
          </Typography>
          <BooleanField value={record?.isActive} />

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
