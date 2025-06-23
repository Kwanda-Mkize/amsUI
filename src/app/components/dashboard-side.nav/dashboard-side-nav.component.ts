import { Component, inject, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { navItems } from "../../shared/navItems";
import { INavMenu } from "../../shared/interfaces/NavMenu";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../services/authService/auth-service.service";

@Component({
  selector: "app-dashboard-side-nav",
  standalone: true,
  imports: [MatSidenavModule, CommonModule],
  templateUrl: "./dashboard-side-nav.component.html",
  styleUrl: "./dashboard-side-nav.component.css",
})
export class DashboardSideNavComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthServiceService);
  navItemList: INavMenu[] = [];
  name? = "";
  email? = "";

  ngOnInit(): void {
    this.navItemList = navItems;
    this.name = localStorage.getItem("userName") ?? undefined;
    this.email = localStorage.getItem("Email") ?? undefined;
  }

  onNavChange(path: string): void {
    const navItemPath = path;
    if (navItemPath) {
      this.router.navigateByUrl(navItemPath);
    }
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
