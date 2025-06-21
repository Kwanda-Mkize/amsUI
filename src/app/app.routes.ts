import { Routes } from "@angular/router";
// import { AddAssetComponent } from "./components/add.asset/add.asset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddAssetComponent } from "./components/dashboard/add.asset/add.asset.component";
import { SsoLoginComponent } from "./components/sso-login/sso-login.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
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
    path: "login",
    component: SsoLoginComponent,
  },
];
