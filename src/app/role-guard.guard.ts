import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { AuthServiceService } from "./services/authService/auth-service.service";
import { inject } from "@angular/core";
import { filter, map, take } from "rxjs";

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);
  const allowedRoles = route.data["roles"] as number[];

  return auth.roleId$.pipe(
    filter((role): role is number => role !== null),
    take(1),
    map((userRole) => {
      if (allowedRoles.includes(userRole)) {
        return true;
      }
      router.navigate(["/unauthorized"]);
      return false;
    })
  );
};
