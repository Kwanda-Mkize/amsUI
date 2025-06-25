import { Routes } from "@angular/router";
import { AssignAssetComponent } from './components/dashboard/assign-asset/assign-asset.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddAssetComponent } from "./components/dashboard/add.asset/add.asset.component";
import { SsoLoginComponent } from "./components/sso-login/sso-login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'assign-asset',
        pathMatch: 'full',
      },
      {
         path: 'assign-asset',
         component: AssignAssetComponent,
      },
      {
        path: 'add-asset',
        component: AddAssetComponent,
      }
      
    ],
  },
  {
    path: 'login',
    component: SsoLoginComponent,
  },
];
