import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { Asset } from './asset.model';
import { AssignAssetService } from './assign-asset.service';

@Component({
  selector: 'app-assign-asset',
  standalone: true,
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, ToastrModule]
})
export class AssignAssetComponent implements OnInit {

  employeeName = '';
  employeeEmail = '';
  selectedAssetId: number | null = null;

  searchTerm = '';
  selectedCategories: string[] = [];
  selectedCountry = '';
  selectedCity = '';

  showFilter = false;
  showAllAssets = false;
  isProcessing = false;
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';

  assets: Asset[] = [];
  filteredAssets: Asset[] = [];

  assetCategories = ['Laptop', 'Headphones', 'Mouse', 'Monitor', 'Router'];
  allAssetCategories: string[] = [];

  countries = ['South Africa', 'India', 'United Kingdom'];
  citiesByCountry: Record<string, string[]> = {
    'South Africa': ['Johannesburg'],
    'India': ['Pune', 'Hyderabad', 'Bhopal', 'Chhattisgarh'],
    'United Kingdom': ['Grazeley']
  };

  constructor(
    private assetService: AssignAssetService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.allAssetCategories = ['All', ...this.assetCategories];
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe(data => {
      this.assets = data;
      this.filteredAssets = data.slice(0, 2);
    });
  }

  selectAsset(id: number): void {
    this.selectedAssetId = id;
  }

  assignAsset(): void {
    if (!this.selectedAssetId || !this.employeeName || !this.employeeEmail) {
      this.errorMessage = 'Please fill all required fields';
      this.showErrorModal = true;
      return;
    }

    this.isProcessing = true;
    this.showFilter = false;

    const payload = {
      assetId: '8EEA0403-221C-4540-A00F-69FBEC4ED635',
      adminId: '33333333-3333-3333-3333-333333333333',
      employeeId: 'CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC'
    };

    this.assetService.assignAsset(payload).subscribe({
      next: (res) => {
        console.log('Asset assigned:', res);
        this.isProcessing = false;
        this.showSuccessModal = true;
      },
      error: (err) => {
        console.error('Error assigning asset:', err);
        this.isProcessing = false;
        this.errorMessage = err?.error?.message || 'Assignment failed.';
        this.showErrorModal = true;
      }
    });
  }

  clearForm(): void {
    this.employeeName = '';
    this.employeeEmail = '';
    this.selectedAssetId = null;
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedCountry = '';
    this.selectedCity = '';
    this.showAllAssets = false;
    this.filteredAssets = this.assets.slice(0, 2);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.clearForm();
  }

  backToForm(): void {
    this.showErrorModal = false;
  }

  retryAssign(): void {
    this.showErrorModal = false;
    this.assignAsset();
  }

  toggleFilter(): void {
    if (!this.isProcessing && !this.showSuccessModal && !this.showErrorModal) {
      this.showFilter = !this.showFilter;
    }
  }

  onCountryChange(): void {
    this.selectedCity = '';
  }

  isCategoryChecked(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleCategory(category: string): void {
    if (category === 'All') {
      this.selectedCategories = [];
    } else {
      this.selectedCategories = this.isCategoryChecked(category)
        ? this.selectedCategories.filter(c => c !== category)
        : [...this.selectedCategories, category];
    }
  }

  clearFilters(): void {
    this.selectedCountry = '';
    this.selectedCity = '';
    this.selectedCategories = [];
    this.applyFilters();
  }

  applyFilters(): void {
    const filtered = this.assets.filter(asset => {
      const matchCategory = !this.selectedCategories.length ||
        this.selectedCategories.includes(asset.category);

      const matchLocation = 
        (!this.selectedCountry || asset.location.country === this.selectedCountry) &&
        (!this.selectedCity || asset.location.city === this.selectedCity);

      return matchCategory && matchLocation;
    });

    this.filteredAssets = this.showAllAssets ? filtered : filtered.slice(0, 2);
  }

  searchAssets(): void {
    const result = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredAssets = this.showAllAssets ? result : result.slice(0, 2);
  }

  toggleSeeAssets(): void {
    this.showAllAssets = !this.showAllAssets;
    this.searchAssets(); // Reuse logic for consistency
  }
}

















