import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AssetFormServiceService {
  constructor(private fb: FormBuilder) {}

  CreateAssetForm(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      location: ['', Validators.required],
      brand: ['', Validators.required],
      description: [''],
      serialNumber: ['', Validators.required],
      assetAttributes: this.fb.array([
        this.fb.group({
          feature: ['', Validators.required],
          value: ['', Validators.required],
        }),
      ]),
    });
  }

  addFeatureAttribute(assetAttributes: FormArray): void {
    assetAttributes.push(
      this.fb.group({
        featureId: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  removeFeatureAttribute(assetAttributes: FormArray, index: number) {
    if (assetAttributes.length > 1) {
      assetAttributes.removeAt(index);
    }
  }
}
