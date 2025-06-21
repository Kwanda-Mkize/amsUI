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
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
});

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ["user.read"],
  },
};

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
    ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
  ]),
};
