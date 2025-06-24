import { inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { useAuth } from "../../auth.config";
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
  private readonly authConfig = useAuth();
  http = inject(HttpClient);

  microsoftAccount = this.authConfig.account;
  microsoftToken = this.authConfig.token;
  scope = this.authConfig.scope;

  url = environment.baseUrl;

  async handleRedirectLogin(): Promise<void> {
    try {
      const authenticated: AuthenticationResult | null =
        await this.authConfig.msalInstance.handleRedirectPromise();

      if (authenticated) {
        this.microsoftAccount = authenticated.account!;
        this.microsoftToken =
          await this.authConfig.msalInstance.acquireTokenSilent({
            scopes: [this.scope],
            account: this.microsoftAccount,
          });

        sessionStorage.setItem("Token", `${this.microsoftToken.accessToken}`);
        this.setUser(this.microsoftAccount);
        this.setEmail(this.microsoftAccount);
        await delay(10);

        this.login().subscribe({
          next: (res) => {
            console.log("Sent token successfully:", res);
          },
          error: (err) => {
            console.error("Failed send headers with token:", err);
          },
        });

        this.router.navigateByUrl(mainRoutes.dashboard);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  loginRedirect(): void {
    this.authConfig.msalInstance.loginRedirect({
      scopes: [this.scope],
    });
  }

  login(): Observable<any> {
    return this.http.get(`${this.url}/auth`);
  }

  setUser(microsoftAccount: AccountInfo): void {
    localStorage.setItem("auth_username", microsoftAccount.name ?? "");
  }

  setEmail(microsoftAccount: AccountInfo): void {
    localStorage.setItem("auth_email", microsoftAccount.username);
  }

  logoutRedirect(): void {
    localStorage.clear();
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
