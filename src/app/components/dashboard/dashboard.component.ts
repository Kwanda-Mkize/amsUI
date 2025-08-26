import { Component, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

import { RouterOutlet } from "@angular/router";
import { SideNavMenuComponent } from "../side-nav-menu/side-nav-menu.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterOutlet, SideNavMenuComponent, MatSidenavModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}
