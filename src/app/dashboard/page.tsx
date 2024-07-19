"use client";

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import {
  DataGrid,
  GridRowIdGetter,
  type GridColDef,
} from "@mui/x-data-grid";
import { CanAccess, useApiUrl, useCustom } from "@refinedev/core";
import {
  List,
  NumberField
} from "@refinedev/mui";
import React from "react";
import { Chart, GoogleChartOptions, GoogleDataTableRow } from "react-google-charts";
import { Card } from "../../components/card";
import { TrendIcon } from "../../components/icons/trend-icon";
import ICustomer from "../customer/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
    topCustomers = topCustomersData?.data as ICustomer[];
  }

  // Top items data
  let topItems: GoogleDataTableRow [] = [["Label", "Value"]];

  const { data: topItemsData } = useCustom({
    url: `${API_URL}/dashboard/topItems`,
    method: "get",
  });

  if (topItemsData?.data?.length > 0) {
    topItemsData?.data.forEach((itemData: { itemName: string; totalSale: number }) => {
      topItems.push([itemData.itemName, { v: Number(itemData.totalSale), f: `$ ${itemData.totalSale}` }]);
    });
  }

  const getRowId: GridRowIdGetter<ICustomer> = (row) => row.customerId?.toString();
  
  // Get Expense Vs Sale
  let dataWTD: GoogleDataTableRow[] = [["Item", { v: 0, f: "$0" }]],
    dataMTD: GoogleDataTableRow[] = [["Item", { v: 0, f: "$0" }]],
    dataYTD: GoogleDataTableRow[] = [["Item", { v: 0, f: "$0" }]];
 
  const { data: expenseVsSaleData } = useCustom({
    url: `${API_URL}/dashboard/expenseVsSale`,
    method: "get",
  });

  if (expenseVsSaleData?.data?.length > 0) {
    dataWTD.push(["WTD Sale", { v: Number(expenseVsSaleData?.data[0].totalWTDSale), f: `$ ${expenseVsSaleData?.data[0].totalWTDSale}` }]);
    dataWTD.push(["WTD Expense", { v: Number(expenseVsSaleData?.data[0].totalWTDExpense), f: `$ ${expenseVsSaleData?.data[0].totalWTDExpense}` }]);

    dataMTD.push(["MTD Sale", { v: Number(expenseVsSaleData?.data[0].totalMTDSale), f: `$ ${expenseVsSaleData?.data[0].totalMTDSale}` }]);
    dataMTD.push(["MTD Expense", { v: Number(expenseVsSaleData?.data[0].totalMTDExpense), f: `$ ${expenseVsSaleData?.data[0].totalMTDExpense}` }]);

    dataYTD.push(["YTD Sale", { v: Number(expenseVsSaleData?.data[0].totalYTDSale), f: `$ ${expenseVsSaleData?.data[0].totalYTDSale}` }]);
    dataYTD.push(["YTD Expense", { v: Number(expenseVsSaleData?.data[0].totalYTDExpense), f: `$ ${expenseVsSaleData?.data[0].totalYTDExpense}` }]);
  }

  const pieChartOptions: GoogleChartOptions = {
    is3D: true,
    chartArea: { top: 30, width: '100%', height: '100%' },
    sliceVisibilityThreshold: 0,
    pieSliceText: 'value',
    backgroundColor: 'white',
  };

  // expenseVsSaleFiscalWk Data
  const { data: expenseVsSaleFiscalWkData } = useCustom({
    url: `${API_URL}/dashboard/expenseVsSaleFiscalWk`,
    method: "get",
  });

  let expenseVsSaleFiscalWk: GoogleDataTableRow[] = [['Week', 'Farm Profit', 'Poultry Profit']];

  if (expenseVsSaleFiscalWkData?.data?.length > 0) {
    expenseVsSaleFiscalWkData?.data.forEach((WkData: any) => {
      expenseVsSaleFiscalWk.push([
        WkData.endDay,
        Number(WkData.totalFarmSale) - Number(WkData.totalFarmExpense),
        Number(WkData.totalPoultrySale) - Number(WkData.totalPoultryExpense),
      ]);
    });
  }
   
  const optionsExpenseVsSaleFiscalWkData: GoogleChartOptions = {
    title: '',
    hAxis: { title: 'Week', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    chartArea: { width: '50%', height: '70%' },
    is3d: true,
    backgroundColor: 'white',
  };

  // monthlyProfit Data
  const { data: monthlyProfitData } = useCustom({
    url: `${API_URL}/dashboard/monthlyProfit`,
    method: "get",
  });

  let monthlyProfit: GoogleDataTableRow[] = [];
  monthlyProfit.push(['Month', 'Farm Profit', 'Poultry Profit']);
 
  if (monthlyProfitData?.data?.length > 0) {
    monthlyProfitData?.data.forEach((MtData: any) => {
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

  return (
    <CanAccess>
      <List resource="" title={<Typography variant="h5">Dashboard</Typography>}>
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
                  />
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
                  <Tabs value={value} onChange={handleChange} aria-label="Expense vs Sale">
                    <Tab label="WTD" value="WTD" />
                    <Tab label="MTD" value="MTD" />
                    <Tab label="YTD" value="YTD" />
                  </Tabs>
                  <Box>
                    {value === 'WTD' && (
                      <Chart
                        chartType="PieChart"
                        data={dataWTD}
                        options={pieChartOptions}
                      />
                    )}
                    {value === 'MTD' && (
                      <Chart
                        chartType="PieChart"
                        data={dataMTD}
                        options={pieChartOptions}
                      />
                    )}
                    {value === 'YTD' && (
                      <Chart
                        chartType="PieChart"
                        data={dataYTD}
                        options={pieChartOptions}
                      />
                    )}
                  </Box>
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
    </CanAccess>
  );
}
