import { UpdatePasswordPage } from "@components/pages/auth/components";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function UpdatePassword() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <UpdatePasswordPage title="Farm Management"/>;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
