import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { IAssetRequest } from "../../shared/interfaces/IAssetRequest";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssetRequestService {
  url = environment.baseUrl;
  http = inject(HttpClient);

  private requestedAssetList = new BehaviorSubject<IAssetRequest[]>([]);
  requestedAssetList$ = this.requestedAssetList.asObservable();

  getAllRequests() {
    this.http.get<IAssetRequest[]>(`${this.url}requests`).subscribe({
      next: (res) => {
        this.requestedAssetList.next(res);
        console.log(res);
      },
    });
  }
}
