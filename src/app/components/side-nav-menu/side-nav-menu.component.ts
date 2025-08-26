import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { AuthServiceService } from "../../services/authService/auth-service.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment.development";
import { CommonModule } from "@angular/common";
import { tap } from "rxjs";

@Component({
  selector: "app-side-nav-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./side-nav-menu.component.html",
  styleUrl: "./side-nav-menu.component.css",
})
export class SideNavMenuComponent {
  router = inject(Router);
  authService = inject(AuthServiceService);
  http = inject(HttpClient);
  wireMockUrl = environment.baseWireMockUrl;

  navItemList: any = [];
  userName?: string = "";
  email? = "";
  Initials?: string = "";
  roleid: any = "";

  ngOnInit(): void {
    this.userName = localStorage.getItem("auth_username") ?? undefined;
    this.email = localStorage.getItem("auth_email") ?? undefined;
    this.getInitials(this.userName!);
    this.authService.roleId$.subscribe((res) => {
      this.roleid = res;
    });
    this.getMenuItems(this.roleid);
  }

  onNavChange(path: string): void {
    const navItemPath = path;
    if (navItemPath) {
      this.router.navigateByUrl(navItemPath);
    }
  }

  logout() {
    this.authService.logoutRedirect();
  }

  getInitials(name: string) {
    this.Initials = name
      .trim()
      .split(/\s+/)
      .filter((word: string) => word.length > 0)
      .map((word: string) => word[0].toUpperCase())
      .join("");
  }

  menuItems: any[] = [];
  getMenuItems(Id: any) {
    this.http.get<any[]>(`${this.wireMockUrl}/Menu/${Id}`).subscribe({
      next: (res) => {
        this.menuItems = res;
        const iconMap: { [key: string]: string } = {
          "Add New Assets": "/icons/manage-asset-icon.png",
          "Assign New Assets": "/icons/Assign-asset-icon.png",
          "View Request": "/icons/view-request-icon.png",
          "Repair Request": "/icons/view-repairs-icon.png",
          "My Assets": "/icons/box.png",
          "Link New Asset": "/icons/link.png",
          "Request Assets": "/icons/view-request-icon.png",
          "Request Repair": "/icons/fix.png",
        };
        this.navItemList = this.menuItems.map((item) => ({
          name: item.name,
          url: item.url,
          iconUrl: iconMap[item.name] || "",
        }));
      },
    });
  }
}
