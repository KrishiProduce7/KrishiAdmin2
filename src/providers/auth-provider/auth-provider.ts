"use client";

import { useNotification, type AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";
// import { initiateAuth } from "./aws-cognito"
// import { USERPOOL_CLIENT_ID } from "./aws-exports"
import { 
  AuthFlowType,
  CognitoIdentityProviderClient, 
  InitiateAuthCommand ,
  ForgotPasswordCommand
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { useCustom, useApiUrl } from "@refinedev/core";
import IEmployee from "@app/employee/types";
import { axiosInstance } from "@refinedev/simple-rest";
import { API_URL } from "@providers/data-provider";
// const mockUsers = [
//   {
//     name: "Benny Rodriguez",
//     email: "bennyrodrig91@gmail.com",
//     roles: ["admin"],
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "Jane Doe",
//     email: "janedoe@mail.com",
//     roles: ["editor"],
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
// ];

const config = {
  region: 'us-east-2', // Replace with your desired AWS region
};

interface AuthParams {
  email: string;
  username: string;
  password: string;
  remember: boolean;
}

interface AuthForgotParams {
  email: string;
}

const client = new CognitoIdentityProviderClient(config);

export const authProvider: AuthProvider = {
  
  login: async ({ email, password }: AuthParams) => {
    // Suppose we actually send a request to the back end here.
    const input = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
      ClientId: '5nvbju3q1r7kncs0unklbda92t',
    };

    const command = new InitiateAuthCommand(input);
    try{
      const response = await client.send(command);

      const user = JSON.parse(response?.ChallengeParameters?.userAttributes ?? "");

      // get employee data
      let url = `${API_URL}/employee/employeeEmail?email=${user.email}`;
      const empData = await axiosInstance.get(url);
      const { data } = empData;

      if (data.length == 0) {
        // error fetching user data
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Can not find employee.",
          },
        };
      }

      let employee = data[0];

      // get screenAccess data
      url = `${API_URL}/screenAccess?roleId=${employee?.roleId}`;

      const accessData = {
        admin: {
          list: 1,
        },
        farmworkCategory: {
          edit: 0,
          create: 0,
          delete: 0,
          list: 1,
          show: 1,
        },
        farmwork: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        employeeRole: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        coop: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        vendor: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        employeeTask: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        finance: {
          list: 1,
        },
        employee: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        employeeWage: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },     
        farmExpense: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },  
        farmPayroll: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        employeeManagement: {
          list: 1,
        },
        employeeTimeclock: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
        poultryActivity: {
          edit: 1,
          create: 1,
          delete: 1,
          list: 1,
          show: 1,
        },
      }

      employee = {
        ...employee,
        roles: accessData,
      }

      console.log(employee);

      Cookies.set("auth", JSON.stringify(employee), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };

    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  forgotPassword: async({email} : AuthForgotParams) => {
    const input = { // ForgotPasswordRequest
      ClientId: "5nvbju3q1r7kncs0unklbda92t", // required
      Username: email, // required
    };

    const command = new ForgotPasswordCommand(input);
    try{
      const response = await client.send(command);

      // open?.({
      //   type: "success",
      //   message: "Success",
      //   description: "This is a success message",
      // });
      // { // ForgotPasswordResponse
      //   CodeDeliveryDetails: { // CodeDeliveryDetailsType
      //     Destination: "STRING_VALUE",
      //     DeliveryMedium: "SMS" || "EMAIL",
      //     AttributeName: "STRING_VALUE",
      //   },
      // };
      console.log(response);

      return {
        success: true,
        redirectTo: "/",
      }
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Forgot Password Error",
          message: "Invalid email",
        },
      };
    }
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
