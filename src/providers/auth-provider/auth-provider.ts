"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";
// import { initiateAuth } from "./aws-cognito"
// import { USERPOOL_CLIENT_ID } from "./aws-exports"
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand 
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import


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

export const authProvider: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const client = new CognitoIdentityProviderClient(config);
    const input = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,        
      },
      ClientId: '5nvbju3q1r7kncs0unklbda92t',
    };

    const command = new InitiateAuthCommand(input);
    try{
      const response = await client.send(command);
      console.log(response);

      Cookies.set("auth", JSON.stringify(response), {
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
