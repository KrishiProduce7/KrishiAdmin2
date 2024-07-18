"use client";

import { Suspense } from "react";

import { Authenticated, useCan } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
  const { data } = useCan({
    resource: "dashboard",
    action: "list",
  });

  if (data?.can) {
    return (
      <Suspense>
        <Authenticated key="home-page">
          <NavigateToResource resource="dashboard"/>
        </Authenticated>
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <Authenticated key="home-page">
          <NavigateToResource resource="employeeSchedule"/>
        </Authenticated>
      </Suspense>
    );
  }
  
}
