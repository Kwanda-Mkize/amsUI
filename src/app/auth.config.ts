import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { msalInstance } from "./msal.config";

export const authData = {
  msalInstance,
  account: null as AccountInfo | null,
  token: null as AuthenticationResult | null,
  scope: "api://16684db4-e91f-44ac-87ab-42b6455b84cb/user.read",
};

export function useAuth() {
  return authData;
}
