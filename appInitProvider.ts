import { APP_INITIALIZER, Provider } from "@angular/core";
import { AuthServiceService } from "./src/app/services/authService/auth-service.service";

export function initAuth(authService: AuthServiceService) {
  return () => authService.fetchRoleFromBackend().toPromise();
}

export const appInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initAuth,
  deps: [AuthServiceService],
  multi: true,
};
