import { INavMenu } from "./interfaces/NavMenu";
import { navRoutes } from "../constants/navRoutes-contants";
export const navItems: INavMenu[] = [
  {
    id: 1,
    icon: "/icons/manage-asset-icon.png",
    item: "Manage Assets",
    routePath: navRoutes.manageAssets,
  },
  {
    id: 2,
    icon: "/icons/Assign-asset-icon.png",
    item: "Assign Assets",
    routePath: navRoutes.assignAssets,
  },
  {
    id: 3,
    icon: "/icons/view-request-icon.png",
    item: "View Requests",
    routePath: navRoutes.viewRequests,
  },
  {
    id: 4,
    icon: "/icons/view-repairs-icon.png",
    item: "Repair Requests",
    routePath: navRoutes.repairRequests,
  },
];
