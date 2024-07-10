"use client";

import { AccessControlProvider } from "@refinedev/core";
import { CanParams} from "@refinedev/core/dist/contexts/accessControl/types";
import Cookies from "js-cookie";

export const accessControlProvider : AccessControlProvider = {
  can: async ({ action, resource }: CanParams) => {
    const user = JSON.parse(Cookies.get("auth"));    
    const accessData = user?.roles ?? {};

    if (resource in accessData) {
      if (action in accessData[`${resource}`]) {
        if (accessData[`${resource}`][`${action}`]) {
          return {
            can: true,
          }
        } 
      }
    } 
    
    return {
      can: false,
      reason: "Unauthorized",
    }
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
  },
}