"use client";
import type { AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/mui";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      formProps={{
        defaultValues: { email: "test@gmail.com", password: "1qaz2wsx!QAZ" },
      }}
    />
  );
};
