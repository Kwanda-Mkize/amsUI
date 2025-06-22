import { Component } from "@angular/core";
import { DashboardSideNavComponent } from "../dashboard-side.nav/dashboard-side-nav.component";
import { MatSidenavModule } from "@angular/material/sidenav";

import { RouterOutlet } from "@angular/router";
import { AssignAssetComponent } from "./assign-asset/assign-asset.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterOutlet, DashboardSideNavComponent, MatSidenavModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {}
