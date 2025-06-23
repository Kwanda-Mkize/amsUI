import { inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { useAuth } from "../../auth.config";
import { Router } from "@angular/router";
import { ROUTES } from "../../constants/constant-routes";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private router = inject(Router);
  private readonly authConfig = useAuth();
  http = inject(HttpClient);

  microsoftAccount = this.authConfig.account;
  microsoftToken = this.authConfig.token;

  url = environment.baseUrl;
  wireUrl = environment.wireMockUrl;

  async handleRedirectLogin(): Promise<void> {
    try {
      const authenticated: AuthenticationResult | null =
        await this.authConfig.msalInstance.handleRedirectPromise();

      if (authenticated) {
        this.microsoftAccount = authenticated.account!;
        this.microsoftToken = authenticated.accessToken;

        sessionStorage.setItem("Token", `${this.microsoftToken}`);
        this.setUser(this.microsoftAccount);
        this.setEmail(this.microsoftAccount);
        // console.log(sessionStorage.getItem());
        this.login().subscribe({
          next: (res) => {
            console.log("Sent token successfully:", res);
          },
          error: (err) => {
            console.error("Failed send headers with token:", err);
          },
        });

        this.router.navigateByUrl(ROUTES.dashboard);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  loginRedirect(): void {
    this.authConfig.msalInstance.loginRedirect();
  }

  login(): Observable<any> {
    return this.http.post(`${this.url}/auth`, null);
  }

  setUser(microsoftAccount: AccountInfo): void {
    localStorage.setItem("userName", microsoftAccount.name ?? "");
  }

  setEmail(microsoftAccount: AccountInfo): void {
    localStorage.setItem("Email", microsoftAccount.username);
  }

  logoutRedirect(): void {
    localStorage.clear();
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
