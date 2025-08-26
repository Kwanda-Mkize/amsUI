import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MsalBroadcastService } from "@azure/msal-angular";

import { AuthInterceptorService } from "./services/interceptor/auth-interceptor.service";
import { AuthServiceService } from "./services/authService/auth-service.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptorService])),
    provideAnimationsAsync(),
    MsalBroadcastService,
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthServiceService) => () => auth.restoreAuthState(),
      deps: [AuthServiceService],
      multi: true,
    },
  ],
};
