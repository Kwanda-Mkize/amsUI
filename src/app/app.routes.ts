import { Routes } from "@angular/router";
// import { AddAssetComponent } from "./components/add.asset/add.asset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddAssetComponent } from "./components/dashboard/add.asset/add.asset.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
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
];
