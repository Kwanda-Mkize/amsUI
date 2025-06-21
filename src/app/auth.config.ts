import { AccountInfo } from "@azure/msal-browser";
import { msalInstance } from "./msal.config";

const authData = {
  msalInstance,
  account: null as AccountInfo | null,
  token: "",
};

export function useAuth() {
  return authData;
}
