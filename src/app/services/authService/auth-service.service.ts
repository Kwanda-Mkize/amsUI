import { inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { useAuthState } from "../../auth.state";
import { Router } from "@angular/router";
import { mainRoutes } from "../../constant-routes/main-routes";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private router = inject(Router);
  private readonly authState = useAuthState();
  http = inject(HttpClient);

  microsoftAccount = this.authState.account;
  microsoftToken = this.authState.token;
  scope = this.authState.scope;

  url = environment.baseUrl;

  async handleRedirectLogin(): Promise<void> {
    try {
      const authenticated: AuthenticationResult | null =
        await this.authState.msalInstance.handleRedirectPromise();

      if (authenticated) {
        this.microsoftAccount = authenticated.account!;
        this.microsoftToken =
          await this.authState.msalInstance.acquireTokenSilent({
            scopes: [this.scope],
            account: this.microsoftAccount,
          });

        this.setToken(this.microsoftToken);
        this.setUser(this.microsoftAccount);
        this.setEmail(this.microsoftAccount);

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

  loginRedirect(): void {
    this.authState.msalInstance.loginRedirect({
      scopes: [this.scope],
    });
  }

  logoutRedirect(): void {
    localStorage.clear();
    this.authState.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
