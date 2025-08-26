import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const token = localStorage.getItem("jwt");
  if (token) {
    // router.navigate(["/dashboard"]);
    return true;
  } else {
    router.navigate(["/user"]);
    return false;
  }
};
