import { Component } from "@angular/core";
import { DashboardSideNavComponent } from "../dashboard-side.nav/dashboard-side-nav.component";
import { MatSidenavModule } from "@angular/material/sidenav";

import { RouterOutlet } from "@angular/router";
import { ManageRequestsComponent } from "./manage-requests/manage-requests.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardSideNavComponent,
    MatSidenavModule,
    ManageRequestsComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {}
