import { Component, inject } from "@angular/core";
import { AuthServiceService } from "../../services/authService/auth-service.service";

@Component({
  selector: "app-sso-login",
  standalone: true,
  imports: [],
  templateUrl: "./sso-login.component.html",
  styleUrl: "./sso-login.component.css",
})
export class SsoLoginComponent {
  private authService = inject(AuthServiceService);

  ngOnInit(): void {
    this.authService.handleRedirectLogin();
  }

  autoLogin(): void {
    this.authService.loginRedirect();
  }
}
