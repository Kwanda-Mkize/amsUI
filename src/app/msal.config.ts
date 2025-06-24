import { environment } from "../environments/environment.development";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from "@azure/msal-angular";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: environment.clientId,
    authority: `https://login.microsoftonline.com/${environment.tenantId}`,
    redirectUri: "http://localhost:4200",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ["api://16684db4-e91f-44ac-87ab-42b6455b84cb/user.read"],
  },
};

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
    [
      "https://localhost:7091/api",
      ["api://16684db4-e91f-44ac-87ab-42b6455b84cb/user.read"],
    ],
  ]),
};
