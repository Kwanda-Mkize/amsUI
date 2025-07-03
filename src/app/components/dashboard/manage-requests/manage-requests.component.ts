import { Component, inject, OnInit } from "@angular/core";
import { IAssetRequest } from "../../../shared/interfaces/IAssetRequest";
import { AssetRequestService } from "../../../services/asset-request/asset-request.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-manage-requests",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./manage-requests.component.html",
  styleUrl: "./manage-requests.component.css",
})
export class ManageRequestsComponent implements OnInit {
  requestedAssets: IAssetRequest[] = [];
  AssetRequestService = inject(AssetRequestService);

  ngOnInit(): void {
    this.AssetRequestService.getAllRequests();
    this.AssetRequestService.requestedAssetList$.subscribe((res) => {
      this.requestedAssets = res;
    });
    console.log(this.requestedAssets);
  }
}
