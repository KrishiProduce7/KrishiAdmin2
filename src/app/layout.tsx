import { DevtoolsProvider } from "@providers/devtools";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";

export const metadata: Metadata = {
  title: "FarmWorks",
  description: "Generated by create refine app",
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
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

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
                    resources={[   
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
                        },
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
