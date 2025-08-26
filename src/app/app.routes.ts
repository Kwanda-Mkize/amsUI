import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddAssetComponent } from "./components/dashboard/add.asset/add.asset.component";
import { SsoLoginComponent } from "./components/sso-login/sso-login.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { roleGuard } from "./role-guard.guard";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: SsoLoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: "admin",
        component: AdminDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [1] },
        children: [
          {
            path: "",
            redirectTo: "add-asset",
            pathMatch: "full",
          },
          {
            path: "add-asset",
            component: AddAssetComponent,
          },
        ],
      },
      {
        path: "user",
        component: UserDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [2] },
      },
    ],
  },
];
