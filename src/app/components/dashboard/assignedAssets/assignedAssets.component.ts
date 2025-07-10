import { Component, inject, OnInit } from "@angular/core";
import { IAssetRequest } from "../../../shared/interfaces/IAssetRequest";
import { AssetRequestService } from "../../../services/assignedAssetsService/assignedAssets.service";
import { CommonModule } from "@angular/common";
import { SearchFilterDownloadBarComponent } from "../search-filter-download-bar/search-filter-download-bar.component";
@Component({
  selector: "app-assigned-asset",
  standalone: true,
  imports: [CommonModule, SearchFilterDownloadBarComponent],
  templateUrl: "./assignedAssets.component.html",
  styleUrl: "./assignedAssets.component.css",
})
export class assignedAssetsComponent implements OnInit {
  requestedAssets: IAssetRequest[] = [];
  AssetRequestService = inject(AssetRequestService);

  ngOnInit(): void {
    this.AssetRequestService.getAllAssignedAssets();
    this.AssetRequestService.requestedAssetList$.subscribe((res) => {
      this.requestedAssets = res;
    });
    console.log(this.requestedAssets);
  }
}
