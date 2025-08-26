import { Component, inject } from "@angular/core";
import { AuthServiceService } from "../../services/authService/auth-service.service";
import { filter, take } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-sso-login",
  standalone: true,
  imports: [],
  templateUrl: "./sso-login.component.html",
  styleUrl: "./sso-login.component.css",
})
export class SsoLoginComponent {
  private authService = inject(AuthServiceService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.handleRedirectLogin();
    this.authService.roleId$.subscribe((role) => {
      if (role === 1) {
        this.router.navigateByUrl("/dashboard/admin");
      } else if (role === 2) {
        this.router.navigateByUrl("/dashboard/user");
      }
    });
  }

  autoLogin(): void {
    this.authService.loginRedirect();
  }
}
