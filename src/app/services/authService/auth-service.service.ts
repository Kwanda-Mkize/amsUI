import { inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { BehaviorSubject } from "rxjs";
import { useAuth } from "../../auth.config";
import { Router } from "@angular/router";
import { ROUTES } from "../../constants/constant-routes";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  // constructor() { }

  private router = inject(Router);
  // private http = inject(HttpClient);
  private readonly authConfig = useAuth();
  // private readonly url = environment.apiUrl;

  private user = new BehaviorSubject<string>("");
  user$ = this.user.asObservable();

  private email = new BehaviorSubject<string>("");
  email$ = this.email.asObservable();

  // private invalidStatus = new BehaviorSubject<boolean>(false);
  // invalidStatus$ = this.invalidStatus.asObservable();

  token: string | null = null;
  account: AccountInfo | null = null;

  constructor() {
    // const storedUser = localStorage.getItem('userName');
    // const storedEmail = localStorage.getItem('Email');
    // if (storedUser) this.user.next(storedUser);
    // if (storedEmail) this.email.next(storedEmail);
  }

  async handleRedirectLogin(): Promise<void> {
    try {
      const result: AuthenticationResult | null =
        await this.authConfig.msalInstance.handleRedirectPromise();

      if (result) {
        this.account = result.account!;
        this.token = result.accessToken;
        console.log(this.token);
        this.setUser(this.account);
        this.setEmail(this.account);

        this.router.navigateByUrl(ROUTES.dashboard);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  loginRedirect(): void {
    this.authConfig.msalInstance.loginRedirect();
  }

  logoutRedirect() {
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.user.next("");
    this.email.next("");
    this.authConfig.msalInstance.logoutRedirect();
  }

  setUser(user: AccountInfo): void {
    // this.user.next(user.name ?? '');
    localStorage.setItem("userName", user.name ?? "");
  }

  setEmail(user: AccountInfo): void {
    // this.email.next(user.username);
    localStorage.setItem("Email", user.username);
  }
}
