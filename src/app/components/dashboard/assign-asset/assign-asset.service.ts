import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset } from './asset.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignAssetService {
  private apiUrl = 'https://q53mz.wiremockapi.cloud/assets';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);

  }

  assignAsset(payload: {
  assetId: string;
  adminId: string;
  employeeId: string;
}): Observable<any> {
  const url = 'https://q53mz.wiremockapi.cloud/assignments';

  return this.http.post(url, payload, {
    headers: {
      Authorization: 'Bearer test_token',
      'Content-Type': 'application/json'
    }
  });
}

}


//     return of([
//       {
//         id: 0,
//         name: 'Macbook Pro',
//         category: 'Laptop',
//         ram: '16GB',
//         processor: 'M2 Pro',
//         hardDrive: '500Gb SSD',
//         location: {
//           country: 'South Africa',
//           city: 'Johannesburg'
//         }
//       },
//       {
//         id: 1,
//         name: 'Logitech MX Master',
//         category: 'Mouse',
//         ram: 'N/A',
//         processor: 'N/A',
//         hardDrive: 'N/A',
//         location: {
//           country: 'Kenya',
//           city: 'Nairobi'
//         }
//       },
//       {
//         id: 2,
//         name: 'HP EliteDisplay',
//         category: 'Monitor',
//         ram: 'N/A',
//         processor: 'N/A',
//         hardDrive: 'N/A',
//         location: {
//           country: 'Namibia',
//           city: 'Windhoek'
//         }
//       },
//       {
//         id: 3,
//         name: 'Sony WH-1000XM4',
//         category: 'Headphones',
//         ram: 'N/A',
//         processor: 'N/A',
//         hardDrive: 'N/A',
//         location: {
//           country: 'South Africa',
//           city: 'Cape Town'
//         }
//       },
//       {
//         id: 4,
//         name: 'Dell Latitude',
//         category: 'Laptop',
//         ram: '8GB',
//         processor: 'Intel i5',
//         hardDrive: '256GB SSD',
//         location: {
//           country: 'Kenya',
//           city: 'Mombasa'
//         }
//       },
//       {
//         id: 5,
//         name: 'TP-Link Archer C6',
//         category: 'Router',
//         ram: 'N/A',
//         processor: 'N/A',
//         hardDrive: 'N/A',
//         location: {
//           country: 'Namibia',
//           city: 'Swakopmund'
//         }
//       }
//     ]);
//   }

