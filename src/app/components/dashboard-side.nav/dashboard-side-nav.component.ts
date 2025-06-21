import { Component, inject, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { navItems } from "../../shared/navItems";
import { INavMenu } from "../../shared/interfaces/NavMenu";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { navRoutes } from "../../constants/navRoutes-contants";

@Component({
  selector: "app-dashboard-side-nav",
  standalone: true,
  imports: [MatSidenavModule, CommonModule],
  templateUrl: "./dashboard-side-nav.component.html",
  styleUrl: "./dashboard-side-nav.component.css",
})
export class DashboardSideNavComponent implements OnInit {
  router = inject(Router);
  navItemList: INavMenu[] = [];
  ngOnInit(): void {
    this.navItemList = navItems;
    console.log(this.navItemList);
  }

  onNavChange(path: string): void {
    const navItemPath = path;
    if (navItemPath) {
      console.log(navItemPath);
      this.router.navigateByUrl(navItemPath);
    }
  }
}
