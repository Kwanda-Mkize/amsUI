import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: "app-dashboard-side-nav",
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: "./dashboard-side-nav.component.html",
  styleUrl: "./dashboard-side-nav.component.css",
})
export class DashboardSideNavComponent {}
