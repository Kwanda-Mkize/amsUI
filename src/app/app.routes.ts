import { Routes } from "@angular/router";
// import { AddAssetComponent } from "./components/add.asset/add.asset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddAssetComponent } from "./components/dashboard/add.asset/add.asset.component";
import { AssignAssetComponent } from './components/dashboard/assign-asset/assign-asset.component';

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
        redirectTo: "assign-asset",
        pathMatch: "full",
      },
      {
        path: "add-asset",
        component: AddAssetComponent,
      },
      {
        path: "assign-asset",
        component: AssignAssetComponent,
      },
    ],
  },
];
