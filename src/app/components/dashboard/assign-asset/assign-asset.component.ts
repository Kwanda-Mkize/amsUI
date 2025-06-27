import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { IAsset } from './../../../shared/interfaces/IAssetData';
import { ILocation } from './../../../shared/interfaces/ILocation';
import { IEmployee } from './../../../shared/interfaces/IEmployee';
import { ICategory } from './../../../shared/interfaces/Icategory';
import { IBrand } from './../../../shared/interfaces/Ibrand';

import { AssignAssetService } from './../../../services/assignAssetService/assign-asset.service';

@Component({
  selector: 'app-assign-asset',
  standalone: true,
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, ToastrModule]
})
export class AssignAssetComponent implements OnInit {
  username = '';
  employeeEmail = '';
  employeeId = '';
  locationId = '';

  searchTerm = '';
  selectedCategories: string[] = [];
  selectedCountry = '';
  selectedCity = '';

  filterCountry = '';
  filterCity = '';

  isProcessing = false;
  showSuccessModal = false;
  showErrorModal = false;
  showFilter = false;
  showAllAssets = false;
  errorMessage = '';
  showSuggestions = false;

  assets: IAsset[] = [];
  filteredAssets: IAsset[] = [];
  employees: IEmployee[] = [];
  filteredEmployees: IEmployee[] = [];
  selectedAssetId: string | null = null;
  assignedAssetDetails: Partial<IAsset> | null = null;

  brands: IBrand[] = [];
  categories: ICategory[] = [];
  brandMap: Record<string, string> = {};
  categoryMap: Record<string, string> = {};

  assetCategories = ['Laptop', 'Headphones', 'Mouse', 'Monitor', 'Router'];
  allAssetCategories: string[] = [];

  countries: string[] = [];
  citiesByCountry: Record<string, string[]> = {};
  locationMap: Record<string, ILocation> = {};

  constructor(private assetService: AssignAssetService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.allAssetCategories = ['All', ...this.assetCategories];
    this.loadAssets();
    this.loadEmployees();
    this.loadLocations();
    this.loadBrands();
    this.loadCategories();

  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe((data: IAsset[]) => {
      this.assets = data;
      console.log('Assets loaded:', data);
      this.filteredAssets = data.slice(0, 2);
    });
  }

  loadEmployees(): void {
    this.assetService.getEmployees().subscribe((data: IEmployee[]) => {
      this.employees = data;
    });
  }

  loadLocations(): void {
  this.assetService.getLocations().subscribe((locations: ILocation[]) => {
    this.countries = [...new Set(locations.map(loc => loc.locationCountry))];
    this.citiesByCountry = {};
    this.locationMap = {};

    locations.forEach(loc => {
      if (!this.citiesByCountry[loc.locationCountry]) {
        this.citiesByCountry[loc.locationCountry] = [];
      }
      this.citiesByCountry[loc.locationCountry].push(...loc.locationCity);

      this.locationMap[loc.locationId] = loc;
    });
  });
}




  loadBrands(): void {
  this.assetService.getBrands().subscribe((brands: IBrand[]) => {
    this.brands = brands;
    this.brandMap = {};
    brands.forEach(brand => {
      this.brandMap[brand.brandId] = brand.brandName;
    });
  });
}

loadCategories(): void {
  this.assetService.getCategories().subscribe((cats: ICategory[]) => {
    this.categories = cats;
    this.categoryMap = {};
    cats.forEach(cat => {
      this.categoryMap[cat.categoryId] = cat.categoryName;
    });
  });
}


  onEmailInputChange(): void {
    const query = this.employeeEmail.toLowerCase();
    this.filteredEmployees = this.employees.filter(e => e.email.toLowerCase().includes(query));
    this.showSuggestions = true;
  }

  hideSuggestionsWithDelay(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  selectEmployee(emp: IEmployee): void {
    this.employeeEmail = emp.email;
    this.username = emp.username;
    this.employeeId = emp.employeeId;
    this.showSuggestions = false;
  }

  selectAsset(assetId: string): void {
    this.selectedAssetId = assetId;
  }

  assignAsset(): void {
  console.log('Selected asset:', this.selectedAssetId);
  console.log('Selected employee ID:', this.employeeId);
  console.log('Selected Country:', this.locationId);

  if (!this.selectedAssetId || !this.employeeId) {
    this.errorMessage = 'Please fill all fields and select an asset.';
    this.showErrorModal = true;
    return;
  }

  this.isProcessing = true;

  const payload = {
    assetId: this.selectedAssetId,
    adminId: '33333333-3333-3333-3333-333333333333',
    employeeId: this.employeeId
  };

  this.assetService.assignAsset(payload).subscribe({
  next: (res) => {
    const assignedAsset = res.asset;
    this.assignedAssetDetails = {
      assetId: assignedAsset.assetId, 
      description: assignedAsset.name,
      serialNumber: assignedAsset.serialNumber
    };

      this.isProcessing = false;
      this.showSuccessModal = true;
    },
    error: (err) => {
      this.isProcessing = false;
      this.errorMessage = err?.error?.message || 'Asset Assignment failed.';
      this.showErrorModal = true;
    }
  });
}



  clearForm(): void {
    this.username = '';
    this.employeeEmail = '';
    this.employeeId = '';
    this.selectedAssetId = null;
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedCountry = '';
    this.selectedCity = '';
    this.filteredAssets = this.assets.slice(0, 2);
    this.showAllAssets = false;
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
    this.showFilter = !this.showFilter;
  }

  toggleCategory(category: string): void {
    if (category === 'All') {
      this.selectedCategories = [];
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index >= 0) {
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(category);
      }
    }
  }

  isCategoryChecked(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  onCountryChange(): void {
    this.selectedCity = '';
  }

  applyFilters(): void {
  this.selectedCountry = this.filterCountry;
  this.selectedCity = this.filterCity;

  this.filteredAssets = this.assets.filter(asset => {
    const loc = this.locationMap[asset.locationId];
    return (
      (!this.selectedCategories.length || this.selectedCategories.includes(asset.categoryId)) &&
      (!this.filterCountry || loc?.locationCountry === this.filterCountry) &&
      (!this.filterCity || loc?.locationCity.includes(this.filterCity))
    );
  });

  if (!this.showAllAssets) {
    this.filteredAssets = this.filteredAssets.slice(0, 2);
  }

  this.showFilter = false;
}


  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedCountry = '';
    this.selectedCity = '';
    this.applyFilters();
  }

  searchAssets(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredAssets = this.assets.filter(asset =>
    asset.serialNumber.toLowerCase().includes(term) ||
    asset.description.toLowerCase().includes(term) ||
    (this.categoryMap[asset.categoryId]?.toLowerCase().includes(term))
  );
  if (!this.showAllAssets) this.filteredAssets = this.filteredAssets.slice(0, 2);
}


  toggleSeeAssets(): void {
    this.showAllAssets = !this.showAllAssets;
    this.searchAssets();
  }
}
