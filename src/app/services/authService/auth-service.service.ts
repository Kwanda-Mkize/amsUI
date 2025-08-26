import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { useAuthState } from "../../auth.state";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthServiceService {
  // private router = inject(Router);
  private readonly authState = useAuthState();
  private http = inject(HttpClient);

  private _roleId = new BehaviorSubject<number | null>(null);
  roleId$ = this._roleId.asObservable();

  microsoftAccount = this.authState.account;
  microsoftToken = this.authState.token;
  scope = this.authState.scope;

  url = environment.baseUrl;
  wireMockUrl = environment.baseWireMockUrl;

  private processedMenuItems = new BehaviorSubject<any[]>([]);
  processedMenuItems$ = this.processedMenuItems.asObservable();

  constructor() {}

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

        this.fetchRoleFromBackend().subscribe();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  async restoreAuthState(): Promise<void> {
    const accounts = this.authState.msalInstance.getAllAccounts();

    if (accounts.length > 0) {
      this.microsoftAccount = accounts[0];

      try {
        this.microsoftToken =
          await this.authState.msalInstance.acquireTokenSilent({
            scopes: [this.scope],
            account: this.microsoftAccount,
          });

        this.setToken(this.microsoftToken);
        this.setUser(this.microsoftAccount);
        this.setEmail(this.microsoftAccount);

        const res = await this.http
          .get<{ RoleId: number }>(`${this.wireMockUrl}/user/${1}`)
          .toPromise();

        this._roleId.next(res?.RoleId ?? null);
      } catch (err) {
        console.error("Silent token restore failed:", err);
        this._roleId.next(null);
      }
    } else {
      this._roleId.next(null);
    }
  }

  fetchRoleFromBackend(): Observable<{ RoleId: number }> {
    return this.http
      .get<{ RoleId: number }>(`${this.wireMockUrl}/user/${1}`)
      .pipe(tap((res) => this._roleId.next(res.RoleId)));
  }

  setToken(microsoftToken: any) {
    sessionStorage.setItem("Token", microsoftToken.accessToken);
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

  // get roleIdValue(): number | null {
  //   return this._roleId.value;
  // }
}
