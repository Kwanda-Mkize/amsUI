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
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastrModule
  ]
})
export class AssignAssetComponent implements OnInit {
  employeeName = '';
  employeeEmail = '';
  country = '';
  city = '';
  selectedCountry = '';
  selectedCity = '';
  searchTerm = '';
  selectedAssetId: number | null = null;
  showFilter = false;
  showAllAssets = false;

  assets: Asset[] = [];
  filteredAssets: Asset[] = [];

  assetCategories: string[] = ['Laptop', 'Headphones', 'Mouse', 'Monitor', 'Router'];
  allAssetCategories: string[] = [];
  selectedCategories: string[] = [];

  countries: string[] = ['South Africa', 'India', 'United Kingdom'];
  citiesByCountry: { [key: string]: string[] } = {
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
    if (this.selectedAssetId !== null && this.employeeName && this.employeeEmail) {
      this.toastr.success('Asset assigned successfully!');
    } else {
      this.toastr.error('Please fill all fields and select an asset.');
    }
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

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  isCategoryChecked(cat: string): boolean {
    return this.selectedCategories.includes(cat);
  }

  toggleCategory(cat: string): void {
    if (cat === 'All') {
      this.selectedCategories = [];
    } else {
      if (this.isCategoryChecked(cat)) {
        this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
      } else {
        this.selectedCategories.push(cat);
      }
    }
  }

  onCountryChange(): void {
    this.selectedCity = '';
  }

  searchAssets(): void {
    const result = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredAssets = this.showAllAssets ? result : result.slice(0, 2);
  }

  toggleSeeAssets(): void {
    this.showAllAssets = !this.showAllAssets;

    // Apply current search filter and limit or show all
    const filtered = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredAssets = this.showAllAssets ? filtered : filtered.slice(0, 2);
  }

  applyFilters(): void {
    const filtered = this.assets.filter(asset => {
      const matchCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(asset.category);

      const matchLocation =
        (!this.selectedCountry || asset.location.country === this.selectedCountry) &&
        (!this.selectedCity || asset.location.city === this.selectedCity);

      return matchCategory && matchLocation;
    });

    this.filteredAssets = this.showAllAssets ? filtered : filtered.slice(0, 2);
  }

  clearFilters(): void {
    this.selectedCountry = '';
    this.selectedCity = '';
    this.selectedCategories = [];
    this.applyFilters();
  }

  assignAsset1(): void {
  console.log('Employee Name:', this.employeeName);
  console.log('Employee Email:', this.employeeEmail);
  console.log('Selected Country:', this.selectedCountry);
  console.log('Selected City:', this.selectedCity);
  console.log('Selected Asset ID:', this.selectedAssetId);

  if (this.selectedAssetId !== null && this.employeeName && this.employeeEmail) {
    this.toastr.success('Asset assigned successfully!');
  } else {
    this.toastr.error('Please fill all fields and select an asset.');
  }
}
}


