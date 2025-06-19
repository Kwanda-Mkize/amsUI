import { Routes } from '@angular/router';
import { AddAssetComponent } from './components/add.asset/add.asset.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Default',
    pathMatch: 'full',
  },
  {
    path: 'Default',
    component: AddAssetComponent,
  },
];
