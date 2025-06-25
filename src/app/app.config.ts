import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  msalInstance,
  msalInterceptorConfig,
  msalGuardConfig,
} from './msal.config';

import { AuthInterceptorService } from './services/interceptor/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr'; // ✅ Add this

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptorService])),
    provideAnimationsAsync(),
    importProvidersFrom(
      // ✅ Provide ToastrModule.forRoot() here
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        timeOut: 3000,
      }),
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

