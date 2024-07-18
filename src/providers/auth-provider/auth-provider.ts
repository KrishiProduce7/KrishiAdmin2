"use client";

import { useNotification, type AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";
import { 
  AuthFlowType,
  CognitoIdentityProviderClient, 
  InitiateAuthCommand ,
  ForgotPasswordCommand,
  AdminCreateUserCommand,
  ConfirmForgotPasswordCommand,
  MessageActionType
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { useCustom, useApiUrl } from "@refinedev/core";
import IEmployee from "@app/employee/types";
import { axiosInstance } from "@refinedev/simple-rest";
import { API_URL } from "@providers/data-provider";

const config = {
  region: 'us-east-2', // Replace with your desired AWS region
};

// 
// const client = new CognitoIdentityProviderClient({
//   region: process.env.AWS_REGION, // Or specify your region directly
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// npm run refine swizzle

interface AuthParams {
  email: string;
  username: string;
  password: string;
  remember: boolean;
}

interface AuthForgotParams {
  email: string;
}

interface AuthRegisterParams {
  name: string;
  email: string;
  mobile: string;
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

      // get employee data
      let url = `${API_URL}/employee/employeeEmail?email=${email}`;
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
      const resp = await axiosInstance.get(url);
      const { data: accessData } = resp;

      employee = {
        ...employee,
        roles: accessData,
      }

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
          name: "Login Error",
          message: error?.message,
        },
      };
    }
  },
  register: async({name, mobile, email} : AuthRegisterParams) => {
    const input = {
      DesiredDeliveryMediums: [
        "EMAIL"
      ],
      MessageAction: MessageActionType.RESEND,
      UserAttributes: [
        {
          Name: "name",
          Value: name,
        },
        {
          Name: "phone_number",
          Value: mobile,
        },
        {
          "Name": "email",
          "Value": email,
        }
      ],
      UserPoolId: "us-east-2_IrMWwzXSQ",
      Username: "testuser"
    };

    console.log(input);

    const command = new AdminCreateUserCommand(input);

    try{
      const response = await client.send(command);
  
      console.log(response);

      return {
        success: true,
      }
    } catch (error) {
      console.log(error);

      return {
        success: false,
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
 
      Cookies.set("forgot-email", email, {
        expires: 1, // 30 days
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/update-password",
      }
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Forgot Password Error",
          message: error?.message,
        },
      };
    }
  },
  updatePassword: async ({ resetCode, password, confirmPassword }) => {
    const email = Cookies.get("forgot-email");

    const input = { // ConfirmForgotPasswordRequest
      ClientId: "5nvbju3q1r7kncs0unklbda92t", // required
      Username: email,
      ConfirmationCode: resetCode,
      Password: password,
    };

    console.log(input);

    const command = new ConfirmForgotPasswordCommand(input);
    try{
      const response = await client.send(command);
      
      console.log("11111111111111");
      console.log(response);

      return {
        success: true,
        redirectTo: "/login",
        successNotification: {
          message: "Update password successful",
          description: "You have successfully updated password.",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: {
          name: "Reset Password Error",
          message: error?.message,
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
