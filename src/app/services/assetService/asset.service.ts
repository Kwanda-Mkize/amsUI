import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory } from '../../shared/interfaces/Icategory';
import { IBrand } from '../../shared/interfaces/Ibrand';
import { ILocation } from '../../shared/interfaces/Ilocation';
import { IFeature } from '../../shared/interfaces/Ifeature';
import { IAsset } from '../../shared/interfaces/IAssetData';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  url = environment.baseUrl;

  http = inject(HttpClient);

  private categoryList = new BehaviorSubject<ICategory[]>([]);
  categoryList$ = this.categoryList.asObservable();

  private locationList = new BehaviorSubject<ILocation[]>([]);
  locationList$ = this.locationList.asObservable();

  private brandList = new BehaviorSubject<IBrand[]>([]);
  brandList$ = this.brandList.asObservable();

  private featureList = new BehaviorSubject<IFeature[]>([]);
  featureList$ = this.featureList.asObservable();

  getCategories() {
    this.http.get<ICategory[]>(`${this.url}/categories`).subscribe({
      next: (res) => {
        this.categoryList.next(res);
      },
    });
  }

  getLocations() {
    this.http.get<ILocation[]>(`${this.url}/locations`).subscribe({
      next: (res) => {
        this.locationList.next(res);
      },
    });
  }

  getBrands() {
    this.http.get<IBrand[]>(`${this.url}/brands`).subscribe({
      next: (res) => {
        this.brandList.next(res);
      },
    });
  }

  getFeaturesByCategoryId(id: any) {
    this.http.get<any>(`${this.url}/features/${id}`).subscribe({
      next: (res) => {
        this.featureList.next(res);
      },
    });
  }

  addNewAsset(assetData: IAsset[]): Observable<any> {
    return this.http.post(`${this.url}/Asset`, assetData);
  }
}
