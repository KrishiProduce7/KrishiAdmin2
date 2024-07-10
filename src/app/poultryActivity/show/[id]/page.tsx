"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import { 
  Show, 
  TextFieldComponent as TextField, 
  DateField, 
  BooleanField, 
  EmailField
} from "@refinedev/mui";

export default function PoultryActivityShow() {
  const { queryResult } = useShow({}); 
  
  const { data, isLoading } = queryResult;
     
  const record = data?.data;
  
  const { data: coopData, isLoading: coopIsLoading } = useOne({
    resource: "coop",
    id: record?.coopId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: employeeData, isLoading: employeeIsLoading } = useOne({
    resource: "employee",
    id: record?.employeeId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"Coop"}
        </Typography>
        {coopIsLoading ? <>Loading...</> : <>{coopData?.data?.name ?? ""}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Employee"}
        </Typography>
        {employeeIsLoading ? <>Loading...</> : <>{employeeData?.data?.firstName + " " + employeeData?.data?.lastName}</>}

        <Typography variant="body1" fontWeight="bold">
          {"Day"}
        </Typography> 
        <DateField value={record?.day} />

        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.categoryDesc} />
        
        <Typography variant="body1" fontWeight="bold">
          {"Feed Bags Used"}
        </Typography>
        <TextField value={record?.feedBagsUsed} />

        <Typography variant="body1" fontWeight="bold">
          {"Medium Eggs Picked"}
        </Typography>
        <TextField value={record?.mediumEggsPicked} />

        <Typography variant="body1" fontWeight="bold">
          {"Large Eggs Picked"}
        </Typography>
        <TextField value={record?.largeEggsPicked} />

        <Typography variant="body1" fontWeight="bold">
          {"Extra Large Eggs Picked"}
        </Typography>
        <TextField value={record?.xLargeEggsPicked} />

        <Typography variant="body1" fontWeight="bold">
          {"Eggs Washed"}
        </Typography>
        <TextField value={record?.eggsWashed} />

        <Typography variant="body1" fontWeight="bold">
          {"Eggs Broken"}
        </Typography>
        <TextField value={record?.eggsBroken} />

        <Typography variant="body1" fontWeight="bold">
          {"Nestbox Eggs"}
        </Typography>
        <TextField value={record?.nestboxEggs} />

        <Typography variant="body1" fontWeight="bold">
          {"Floor Eggs"}
        </Typography>
        <TextField value={record?.floorEggs} />

        <Typography variant="body1" fontWeight="bold">
          {"Clean Eggs"}
        </Typography>
        <TextField value={record?.cleanEggs} />

        <Typography variant="body1" fontWeight="bold">
          {"Dirty Eggs"}
        </Typography>
        <TextField value={record?.dirtyEggs} />

        <Typography variant="body1" fontWeight="bold">
          {"Medium Eggs Packed"}
        </Typography>
        <TextField value={record?.mediumEggsPacked} />

        <Typography variant="body1" fontWeight="bold">
          {"Large Eggs Packed"}
        </Typography>
        <TextField value={record?.largeEggsPacked} />

        <Typography variant="body1" fontWeight="bold">
          {"Extra Large Eggs Packed"}
        </Typography>
        <TextField value={record?.xLargeEggsPacked} />

        <Typography variant="body1" fontWeight="bold">
          {"Manure Bags"}
        </Typography>
        <TextField value={record?.manureBags} />

        <Typography variant="body1" fontWeight="bold">
          {"Chickens Dead"}
        </Typography>
        <TextField value={record?.chickensDead} />

        <Typography variant="body1" fontWeight="bold">
          {"Death Reason"}
        </Typography>
        <TextField value={record?.deathReason} />

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
  );
}
