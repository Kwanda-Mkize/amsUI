import { Component, inject, OnInit } from '@angular/core';
import { AssetService } from '../../services/assetService/asset.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICategory } from '../../shared/interfaces/Icategory';
import { ILocation } from '../../shared/interfaces/Ilocation';
import { IBrand } from '../../shared/interfaces/Ibrand';
import { IFeature, IFeature_ALT } from '../../shared/interfaces/Ifeature';
import { AssetFormServiceService } from '../../services/assetFormService/asset-form-service.service';
import { IAsset } from '../../shared/interfaces/IAssetData';
@Component({
  selector: 'app-add.asset',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.asset.component.html',
  styleUrl: './add.asset.component.css',
})
export class AddAssetComponent implements OnInit {
  categoryList: ICategory[] = [];
  locationList: ILocation[] = [];
  brandList: IBrand[] = [];

  assetData: IAsset[] = [];
  AddAssetForm!: FormGroup;

  istoggleOn: boolean = true;
  featureList: IFeature[] = [];
  featureList_ALT: IFeature_ALT[] = [];

  private destroy$ = new Subject<void>();

  service = inject(AssetService);
  formService = inject(AssetFormServiceService);

  categoryControl = new FormControl('');
  ngOnInit(): void {
    this.AddAssetForm = this.formService.CreateAssetForm();

    this.service.getCategories();
    this.service.getLocations();
    this.service.getBrands();

    this.subscribeToList(
      this.service.categoryList$,
      (res) => (this.categoryList = res)
    );

    this.subscribeToList(
      this.service.locationList$,
      (res) => (this.locationList = res)
    );

    this.subscribeToList(
      this.service.brandList$,
      (res) => (this.brandList = res)
    );

    this.subscribeToList(
      this.service.featureList$,
      (res) => (this.featureList = res)
    );
  }

  private subscribeToList<T>(
    observable$: Observable<T[]>,
    assignFn: (res: T[]) => void
  ): void {
    observable$?.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res?.length > 0) {
        assignFn(res);
      }
    });
  }

  get assetAttributes(): FormArray {
    return this.AddAssetForm.get('assetAttributes') as FormArray;
  }

  onAddFeature() {
    this.formService.addFeatureAttribute(this.assetAttributes);
  }

  onRemoveFeature(index: number) {
    this.formService.removeFeatureAttribute(this.assetAttributes, index);
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategoryId = selectElement.value;

    if (selectedCategoryId) {
      this.service.getFeaturesByCategoryId(selectedCategoryId);
    }
  }

  onSubmit() {
    if (this.AddAssetForm.valid) {
      this.assetData = this.AddAssetForm.value;
      this.service.addNewAsset(this.assetData).subscribe({
        next: (res) => {
          console.log('Asset added successfully:', res);
        },
        error: (err) => {
          console.error('Failed to add asset:', err);
        },
      });
    }
    this.AddAssetForm.markAllAsTouched();
  }
}
