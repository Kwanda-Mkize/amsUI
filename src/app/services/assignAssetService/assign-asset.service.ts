import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAsset } from './../../shared/interfaces/IAssetData';
import { IEmployee } from './../../shared/interfaces/IEmployee';
import { ILocation } from './../../shared/interfaces/ILocation';
import { ICategory } from './../../shared/interfaces/Icategory';
import { IBrand } from './../../shared/interfaces/Ibrand';
import { IAssignment } from './../../shared/interfaces/IAssignment';

@Injectable({
  providedIn: 'root'
})
export class AssignAssetService {
  private baseUrl = 'https://q53mz.wiremockapi.cloud';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<IAsset[]> {
    return this.http.get<IAsset[]>(`${this.baseUrl}/api/v1/assets`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  assignAsset(payload: { assetId: string; adminId: string; employeeId: string }): Observable<IAssignment> {
    return this.http.post<IAssignment>(`${this.baseUrl}/api/v1/assignments`, payload, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${this.baseUrl}/api/v1/employees`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  getLocations(): Observable<ILocation[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/locations`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => response.map(item => ({
        locationId: item.locationId,
        locationCountry: item.country,
        locationCity: item.cities
      })))
    );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}/api/v1/brands`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/api/v1/categories`, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/json'
      }
    });
  }
}
