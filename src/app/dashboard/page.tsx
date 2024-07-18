"use client";

import { DataGrid, GridRowIdGetter, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  DateField,
  useDataGrid,
  BooleanField,
  EmailField,
  NumberField,
} from "@refinedev/mui";
import React from "react";
import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Card } from "../../components/card";
import { TrendIcon } from "../../components/icons/trend-icon";
import { Gauge, GaugeValueText } from '@mui/x-charts/Gauge';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useCustom, useApiUrl } from "@refinedev/core";
import ICustomer from "../customer/types";
import { Chart } from "react-google-charts";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ICustomer {
  customerId: string;
  customerName: string;
  totalSale: number;
}

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export default function DashboardList() {
  const { dataGridProps } = useDataGrid<ICustomer>({
    pagination: {
      mode: "client",
    },
    initialPageSize: 5,
  });

  const API_URL = useApiUrl();

  const { data: yearProfitData } = useCustom({
    url: `${API_URL}/dashboard/ytdProfit`,
    method: "get",
  });

  // Year profit
  let yptData = {
    totalExpense: 0,
    totalSale: 0,
    ytdProfit: 0,
  };

  if (yearProfitData?.data?.length > 0) {
    yptData = yearProfitData?.data[0];
  }

  // Top customers data
  let topCustomers: ICustomer[] = [];

  const { data: topCustomersData } = useCustom({
    url: `${API_URL}/dashboard/topCustomers`,
    method: "get",
  });

  if (topCustomersData?.data?.length > 0) {
    topCustomers = topCustomersData?.data;
  }
  
  // Top customers data
  let topItems: [string, { v: number; f: string }][] = [["Label", "Value"]];

  const { data: topItemsData } = useCustom({
    url: `${API_URL}/dashboard/topItems`,
    method: "get",
  });

  if (topItemsData?.data?.length > 0) {
    topItemsData.data.forEach((itemData: { itemName: string; totalSale: number }) => {
      topItems.push([itemData.itemName, { v: Number(itemData.totalSale), f: `$ ${itemData.totalSale}` }]);
    });
  }

  // Get Expense Vs Sale
  let dataWTD: [string, { v: number; f: string }][] = [["Item", "Value"]],
      dataMTD: [string, { v: number; f: string }][] = [["Item", "Value"]],
      dataYTD: [string, { v: number; f: string }][] = [["Item", "Value"]];
  
  const { data: expenseVsSaleData } = useCustom({
    url: `${API_URL}/dashboard/expenseVsSale`,
    method: "get",
  });

  if (expenseVsSaleData?.data?.length > 0) {
    dataWTD.push(["WTD Sale", { v: Number(expenseVsSaleData.data[0].totalWTDSale), f: `$ ${expenseVsSaleData.data[0].totalWTDSale}` }]);
    dataWTD.push(["WTD Expense", { v: Number(expenseVsSaleData.data[0].totalWTDExpense), f: `$ ${expenseVsSaleData.data[0].totalWTDExpense}` }]);

    dataMTD.push(["MTD Sale", { v: Number(expenseVsSaleData.data[0].totalMTDSale), f: `$ ${expenseVsSaleData.data[0].totalMTDSale}` }]);
    dataMTD.push(["MTD Expense", { v: Number(expenseVsSaleData.data[0].totalMTDExpense), f: `$ ${expenseVsSaleData.data[0].totalMTDExpense}` }]);

    dataYTD.push(["YTD Sale", { v: Number(expenseVsSaleData.data[0].totalYTDSale), f: `$ ${expenseVsSaleData.data[0].totalYTDSale}` }]);
    dataYTD.push(["YTD Expense", { v: Number(expenseVsSaleData.data[0].totalYTDExpense), f: `$ ${expenseVsSaleData.data[0].totalYTDExpense}` }]);
  }

  const pieChartOptions = {
    is3D: true,
    chartArea: {top: 30, width: '100%', height: '100%'},
    sliceVisibilityThreshold: 0,
    pieSliceText: 'value',
  };
 
  // expenseVsSaleFiscalWk Data
  const { data: expenseVsSaleFiscalWkData } = useCustom({
    url: `${API_URL}/dashboard/expenseVsSaleFiscalWk`,
    method: "get",
  });

  let expenseVsSaleFiscalWk: [string, number, number][] = [['Week', 'Farm Profit', 'Poultry Profit']];

  if (expenseVsSaleFiscalWkData?.data?.length > 0) {
    expenseVsSaleFiscalWkData.data.forEach((WkData: any) => {
      expenseVsSaleFiscalWk.push([
        WkData.endDay,
        Number(WkData.totalFarmSale) - Number(WkData.totalFarmExpense),
        Number(WkData.totalPoultrySale) - Number(WkData.totalPoultryExpense),
      ]);
    });
  }

  const optionsExpenseVsSaleFiscalWkData = {
    title: '',
    hAxis: { title: 'Week', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    chartArea: { width: '50%', height: '70%' },
    is3d: true,
  };

  // monthlyProfit Data
  const { data: monthlyProfitData } = useCustom({
    url: `${API_URL}/dashboard/expenseVsSaleFiscalWk`,
    method: "get",
  });

  let monthlyProfit: [string, number, number][] = [['Month', 'Farm Profit', 'Poultry Profit']];

  if (monthlyProfitData?.data?.length > 0) {
    monthlyProfitData.data.forEach((MtData: any) => {
      monthlyProfit.push([
        MtData.endDay,
        Number(MtData.totalFarmSale) - Number(MtData.totalFarmExpense),
        Number(MtData.totalPoultrySale) - Number(MtData.totalPoultryExpense),
      ]);
    });
  }

  const optionsMonthlyProfitData = {
    title: '',
    hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    chartArea: { width: '50%', height: '70%' },
    is3d: true,
  };

  const valueFormatter = (value: number | null) => `${value}mm`;

  const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  const [value, setValue] = React.useState('WTD');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const topCustomerColumns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "customerName",
        flex: 1,
        headerName: "Name",
        minWidth: 100,
      },
      { 
        field: "totalSale",
        flex: 1,
        headerName: "Total Sale",
        minWidth: 200, 
      },
    ],
    []
  );

  // Custom getRowId
  const getRowId: GridRowIdGetter<ICustomer> = (row) => row.customerId?.toString();

  return (
    <List resource="" title={<Typography variant="h5">Dashboard</Typography>}>
      {/* <DataGrid {...dataGridProps} getRowId={getRowId} columns={columns} autoHeight /> */}
      <Container>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                title={"Year Profit"}
                icon={<MonetizationOnOutlinedIcon />}
                sx={{
                  ".MuiCardContent-root:last-child": {
                    paddingBottom: "24px",
                  },
                }}
                cardContentProps={{
                  sx: {
                    height: "208px",
                  },
                }}
                cardHeaderProps={{
                  action: (
                    <TrendIcon
                      trend={10}
                      text={
                        <NumberField
                          value={yptData?.ytdProfit || 0}
                          options={{
                            style: "currency",
                            currency: "USD",
                          }}
                        />
                      }
                    />
                  ),
                }}
              >
                <GaugeContainer
                  value={yptData?.ytdProfit / yptData?.totalSale * 100.0}
                  startAngle={-90}
                  endAngle={90}
                >
                  <GaugeReferenceArc />
                  <GaugeValueArc />
                  <GaugePointer />
                  <GaugeValueText />
                </GaugeContainer>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                icon={<ShoppingBagOutlinedIcon />}
                title={"Top Customers"}
                cardContentProps={{
                  sx: {
                    height: "208px",
                  },
                }}
              >
                <DataGrid 
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  rows={topCustomers}
                  getRowId={getRowId}
                  columns={topCustomerColumns}
                  autoHeight />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                icon={<ShoppingBagOutlinedIcon />}
                title={"Top Items"}
                cardContentProps={{
                  sx: {
                    height: "300px",
                  },
                }}
              >
                <Chart
                  chartType="PieChart"
                  data={topItems}
                  options={pieChartOptions} 
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                icon={<ShoppingBagOutlinedIcon />}
                title={"Farm Profit vs Poultry Profit By Month"}
                cardContentProps={{
                  sx: {
                    height: "300px",
                  },
                }}
              >
                <Chart
                  chartType="AreaChart"
                  width="100%"
                  height="300px"
                  data={monthlyProfit}
                  options={optionsMonthlyProfitData}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                icon={<ShoppingBagOutlinedIcon />}
                title={"Expense Vs Sale"}
                cardContentProps={{
                  sx: {
                    height: "300px",
                  },
                }}
              >
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Expense vs Sale">
                      <Tab label="WTD" value="WTD" />
                      <Tab label="MTD" value="MTD" />
                      <Tab label="YTD" value="YTD" />
                    </TabList>
                  </Box>
                  <TabPanel value="WTD">
                    <Chart
                      chartType="PieChart"
                      data={dataWTD}
                      options={pieChartOptions} 
                    />
                  </TabPanel>
                  <TabPanel value="MTD">
                    <Chart
                      chartType="PieChart"
                      data={dataMTD}
                      options={pieChartOptions} 
                    />
                  </TabPanel>
                  <TabPanel value="YTD">
                    <Chart
                      chartType="PieChart"
                      data={dataYTD}
                      options={pieChartOptions} 
                    />
                  </TabPanel>
                </TabContext>
              </Card>              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                icon={<ShoppingBagOutlinedIcon />}
                title={"Expense Vs Sale By Week This Year"}
                cardContentProps={{
                  sx: {
                    height: "300px",
                  },
                }}
              >
                <Chart
                  chartType="ColumnChart" 
                  width="100%"
                  height="300px"
                  data={expenseVsSaleFiscalWk}
                  options={optionsExpenseVsSaleFiscalWkData}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </List>
  );
}

// Removed this
// If needed copy the below line between <EditButton> and <DeleteButton>
// <ShowButton hideText recordItemId={row.roleId} />
//               <DeleteButton hideText recordItemId={row.coopId} />