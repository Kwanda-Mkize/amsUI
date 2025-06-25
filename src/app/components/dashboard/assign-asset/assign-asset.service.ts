import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Asset } from './asset.model';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class AssignAssetService {
  private baseUrl = 'https://localhost:7091/api/';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.baseUrl}/assets`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  assignAsset(payload: {
    assetId: string;
    adminId: string;
    employeeId: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/assignAsset`, payload, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/locations`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }
}