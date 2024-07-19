import { ColorModeContextProvider } from "@contexts/color-mode";
import { AdminPanelSettingsOutlined, Dashboard } from "@mui/icons-material";
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { accessControlProvider } from "@providers/access-control-provider";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import { DevtoolsProvider } from "@providers/devtools";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Krish Farm Management",
  description: "Krish Farm Management",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  // const defaultMode = theme?.value === "dark" ? "dark" : "light";
  const defaultMode = "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <DevtoolsProvider>
                  <Refine 
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    notificationProvider={notificationProvider}
                    authProvider={authProvider}
                    accessControlProvider={accessControlProvider}
                    resources={[
                      {
                        name: "dashboard",
                        list: "/dashboard",
                        meta: {
                          label: "Dashboard",
                          icon: <Dashboard />,
                        },
                      },
                      {
                        name: "admin",
                        meta: {
                          label: "Admin",
                          icon: <AdminPanelSettingsOutlined />,
                        }
                      },
                      {
                        name: "farmworkCategory",    
                        list: "/farmworkCategory",
                        create: "/farmworkCategory/create",
                        edit: "/farmworkCategory/edit/:id",
                        show: "/farmworkCategory/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "categoryId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Farmwork Category",
                          icon: <LabelOutlinedIcon />,
                        },
                      }, 
                      {
                        name: "farmwork",
                        list: "/farmwork",
                        create: "/farmwork/create",
                        edit: "/farmwork/edit/:id",
                        show: "/farmwork/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "farmWorkId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Farmwork",
                          icon: <AgricultureOutlinedIcon />,
                        },
                      },
                      {
                        name: "employeeRole",
                        list: "/employeeRole",
                        create: "/employeeRole/create",
                        edit: "/employeeRole/edit/:id",
                        show: "/employeeRole/show/:id",
                        meta: {
                          canDelete: false,
                          idName: "roleId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Employee Role",
                          icon: <BadgeOutlinedIcon />,
                        },
                      },
                      {
                        name: "coop",
                        list: "/coop",
                        create: "/coop/create",
                        edit: "/coop/edit/:id",
                        show: "/coop/show/:id",
                        meta: {
                          canDelete: false,
                          idName: "coopId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Coop",
                          icon: <ApartmentOutlinedIcon />,
                        },
                      },
                      {
                        name: "vendor",
                        list: "/vendor",
                        create: "/vendor/create",
                        edit: "/vendor/edit/:id",
                        show: "/vendor/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "vendorId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Vendor",
                          icon: <StoreMallDirectoryOutlinedIcon />,
                        },
                      },
                      {
                        name: "employeeTask",
                        list: "/employeeTask",
                        create: "/employeeTask/create",
                        edit: "/employeeTask/edit/:id",
                        show: "/employeeTask/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "taskId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Employee Task",
                          icon: <AssignmentTurnedInOutlinedIcon />,
                        },
                      },
                      {
                        name: "item",
                        list: "/item",
                        create: "/item/create",
                        edit: "/item/edit/:id",
                        show: "/item/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "itemId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Item",
                          icon: <DescriptionOutlinedIcon />,
                        }
                      },
                      {
                        name: "dept",
                        meta: {
                          hide: true,
                          idName: "deptId",
                        }
                      },
                      {
                        name: "classs",
                        meta: {
                          hide: true,
                          idName: "classId",
                        }
                      },
                      {
                        name: "customer",
                        list: "/customer",
                        create: "/customer/create",
                        edit: "/customer/edit/:id",
                        show: "/customer/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "customerId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Customer",
                          icon: <SupportAgentOutlinedIcon />,
                        }
                      },
                      {
                        name: "farmSales",
                        list: "/farmSale",
                        create: "/farmSale/create",
                        edit: "/farmSale/edit/:id",
                        show: "/farmSale/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "saleId",
                          includeUserEmail: true,
                          parent: "admin",
                          label: "Farm Sales",
                          icon: <TrendingUpOutlinedIcon />, 
                        }
                      },
                      {
                        name: "finance",
                        meta: {
                          label: "Finance",
                          icon: <MonetizationOnOutlinedIcon />
                        }
                      },
                      {
                        name: "employee",
                        list: "/employee",
                        create: "/employee/create",
                        edit: "/employee/edit/:id",
                        show: "/employee/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "employeeId",
                          includeUserEmail: true,
                          parent: "finance",
                          label: "Employee",
                          icon: <PeopleAltOutlinedIcon />
                        },
                      },
                      {
                        name: "employeeWage",
                        list: "/employeeWage",
                        create: "/employeeWage/create",
                        edit: "/employeeWage/edit/:id",
                        show: "/employeeWage/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "wageId",
                          includeUserEmail: true,
                          parent: "finance",
                          label: "Employee Wage",
                          icon: <AttachMoneyOutlinedIcon />,
                        },
                      },
                      {
                        name: "farmExpense",
                        list: "/farmExpense",
                        create: "/farmExpense/create",
                        edit: "/farmExpense/edit/:id",
                        show: "/farmExpense/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "expenseId",
                          includeUserEmail: true,
                          parent: "finance",
                          label: "Farm Expense",
                          icon: <ReceiptLongOutlinedIcon />,
                        },
                      },
                      {
                        name: "farmPayroll",
                        list: "/farmPayroll",
                        create: "/farmPayroll/create",
                        edit: "/farmPayroll/edit/:id",
                        show: "/farmPayroll/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "payrollId",
                          includeUserEmail: true,
                          parent: "finance",
                          label: "Farm Payroll",
                          icon: <RequestQuoteOutlinedIcon />,
                        },
                      },
                      {
                        name: "employeeManagement",
                        meta: {
                          label: "Employee",
                          icon: <PeopleAltOutlinedIcon />,
                        }
                      },
                      {
                        name: "employeeSchedule",
                        list: "/employeeSchedule",
                        meta: {
                          canDelete: false,
                          parent: "employeeManagement",
                          label: "Schedule",
                          icon: <PendingActionsOutlinedIcon />
                        },
                      },
                      {
                        name: "employeeTimeclock",
                        list: "/employeeTimeclock",
                        create: "/employeeTimeclock/create",
                        edit: "/employeeTimeclock/edit/:id",
                        show: "/employeeTimeclock/show/:id",
                        meta: {
                          canDelete: false,
                          idName: "timeclockId",
                          includeUserEmail: false,
                          parent: "employeeManagement",
                          label: "Timeclock",
                          icon: <TimerOutlinedIcon />
                        },
                      },
                      {
                        name: "poultryActivity",
                        list: "/poultryActivity",
                        create: "/poultryActivity/create",
                        edit: "/poultryActivity/edit/:id",
                        show: "/poultryActivity/show/:id",
                        meta: {
                          canDelete: true,
                          idName: "activityId",
                          includeUserEmail: true,
                          parent: "employeeManagement",
                          label: "Poultry Activity",
                          icon: <EggOutlinedIcon />
                        },
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "ZVSfsE-ekvuhD-I5VHNv",
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
