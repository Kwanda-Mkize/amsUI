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
  url = environment.baseUrl;
  wireUrl = environment.wireMockUrl;

  token: string | null = null;
  account: AccountInfo | null = null;

  async handleRedirectLogin(): Promise<void> {
    try {
      const result: AuthenticationResult | null =
        await this.authConfig.msalInstance.handleRedirectPromise();

      if (result) {
        this.account = result.account!;
        this.token = result.accessToken;
        sessionStorage.setItem("Token", "kwanda.token");

        this.setUser(this.account);
        this.setEmail(this.account);

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
    return this.http.post(`${this.wireUrl}/auth`, null);
  }

  setUser(user: AccountInfo): void {
    localStorage.setItem("userName", user.name ?? "");
  }

  setEmail(user: AccountInfo): void {
    localStorage.setItem("Email", user.username);
  }

  logoutRedirect() {
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.authConfig.msalInstance.logoutRedirect();
  }
}
