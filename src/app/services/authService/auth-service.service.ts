import { inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { useAuthEnvirnment } from "../../auth-environment";
import { Router } from "@angular/router";
import { mainRoutes } from "../../constant-routes/main-routes";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { delay, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private router = inject(Router);
  private readonly authEnvironment = useAuthEnvirnment();
  http = inject(HttpClient);

  microsoftAccount = this.authEnvironment.account;
  microsoftToken = this.authEnvironment.token;
  scope = this.authEnvironment.scope;

  url = environment.baseUrl;

  async handleRedirectLogin(): Promise<void> {
    try {
      const authenticated: AuthenticationResult | null =
        await this.authEnvironment.msalInstance.handleRedirectPromise();

      if (authenticated) {
        this.microsoftAccount = authenticated.account!;
        this.microsoftToken =
          await this.authEnvironment.msalInstance.acquireTokenSilent({
            scopes: [this.scope],
            account: this.microsoftAccount,
          });

        this.setToken(this.microsoftToken);
        this.setUser(this.microsoftAccount);
        this.setEmail(this.microsoftAccount);
        await delay(10);

        this.login().subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          },
        });

        this.router.navigateByUrl(mainRoutes.dashboard);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  loginRedirect(): void {
    this.authEnvironment.msalInstance.loginRedirect({
      scopes: [this.scope],
    });
  }

  login(): Observable<any> {
    return this.http.get(`${this.url}/Employees/validate`);
  }

  setToken(microsoftToken: any) {
    sessionStorage.setItem("Token", `${microsoftToken.accessToken}`);
  }
  setUser(microsoftAccount: AccountInfo): void {
    localStorage.setItem("auth_username", microsoftAccount.name ?? "");
  }

  setEmail(microsoftAccount: AccountInfo): void {
    localStorage.setItem("auth_email", microsoftAccount.username);
  }

  logoutRedirect(): void {
    localStorage.clear();
    this.authEnvironment.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
