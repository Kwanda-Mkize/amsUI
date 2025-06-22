import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MsalBroadcastService,
} from "@azure/msal-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  msalInstance,
  msalInterceptorConfig,
  msalGuardConfig,
} from "./msal.config";
import { AuthInterceptorService } from "./services/interceptor/auth-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptorService])),
    provideAnimationsAsync(),
    importProvidersFrom(
      MsalModule.forRoot(msalInstance, msalGuardConfig, msalInterceptorConfig)
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    MsalBroadcastService,
  ],
};
