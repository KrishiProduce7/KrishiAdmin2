"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
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
    id: record?.CategoryId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.FarmWorkID} />

        <Typography variant="body1" fontWeight="bold">
          {"Title"}
        </Typography>
        <TextField value={record?.FarmWorkDesc} />

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.CategoryDesc}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Active"}
        </Typography>
        <BooleanField value={record?.IsActive} />

        <Typography variant="body1" fontWeight="bold">
          {"Status"}
        </Typography>
        <TextField value={record?.UpdatedBy} />

        <Typography variant="body1" fontWeight="bold">
          {"CreatedAt"}
        </Typography>
        <DateField value={record?.UpdatedOn} />
      </Stack>
    </Show>
  );
}
