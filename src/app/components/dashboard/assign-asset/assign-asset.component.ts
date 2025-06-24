import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { Asset } from './asset.model';
import { Employee } from './employee.model';
import { AssignAssetService } from './assign-asset.service';

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

  searchTerm = '';
  selectedCategories: string[] = [];
  selectedCountry = '';
  selectedCity = '';

  isProcessing = false;
  showSuccessModal = false;
  showErrorModal = false;
  showFilter = false;
  showAllAssets = false;
  errorMessage = '';
  showSuggestions = false;

  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedAssetId: string | null = null;

  assetCategories = ['Laptop', 'Headphones', 'Mouse', 'Monitor', 'Router'];
  allAssetCategories: string[] = [];

  countries: string[] = [];
  citiesByCountry: Record<string, string[]> = {};

  constructor(private assetService: AssignAssetService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.allAssetCategories = ['All', ...this.assetCategories];
    this.loadAssets();
    this.loadEmployees();
    this.loadLocations(); 
  }

  loadAssets(): void {
  this.assetService.getAssets().subscribe(data => {
    this.assets = data;
    this.filteredAssets = data.slice(0, 2);

    const countrySet = new Set<string>();
    
    const citiesMap: Record<string, Set<string>> = {};

    data.forEach(asset => {
      const country = asset.location?.country;
      const city = asset.location?.city;

      if (country) {
        countrySet.add(country);
        if (!citiesMap[country]) {
          citiesMap[country] = new Set<string>();
        }
        if (city) {
          citiesMap[country].add(city);
        }
      }
    });

    this.countries = Array.from(countrySet);
    this.citiesByCountry = {};
    for (const country of this.countries) {
      this.citiesByCountry[country] = Array.from(citiesMap[country]);
    }
  });
}

  loadEmployees(): void {
    this.assetService.getEmployees().subscribe(data => {
      this.employees = data;
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

  selectEmployee(emp: Employee): void {
    this.employeeEmail = emp.email;
    this.username = emp.username;
    this.employeeId = emp.employeeId;
    this.showSuggestions = false;
  }

  selectAsset(assetId: number): void {
    this.selectedAssetId = assetId.toString();
  }

  assignAsset(): void {
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
      next: () => {
        this.isProcessing = false;
        this.showSuccessModal = true;
      },
      error: (err) => {
        this.isProcessing = false;
        this.errorMessage = err?.error?.message || 'Assignment failed.';
        this.showErrorModal = true;
      }
    });
  }

  loadLocations(): void {
  this.assetService.getLocations().subscribe(locations => {
    const citiesMap: Record<string, Set<string>> = {};
    const countrySet = new Set<string>();

    locations.forEach(loc => {
      const country = loc.locationName;
      const city = loc.locationCity;

      countrySet.add(country);

      if (!citiesMap[country]) {
        citiesMap[country] = new Set<string>();
      }

      citiesMap[country].add(city);
    });

    this.countries = Array.from(countrySet);
    this.citiesByCountry = {};

    for (const country of this.countries) {
      this.citiesByCountry[country] = Array.from(citiesMap[country]);
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
    this.filteredAssets = this.assets.filter(asset =>
      (!this.selectedCategories.length || this.selectedCategories.includes(asset.category)) &&
      (!this.selectedCountry || asset.location.country === this.selectedCountry) &&
      (!this.selectedCity || asset.location.city === this.selectedCity)
    );
    if (!this.showAllAssets) this.filteredAssets = this.filteredAssets.slice(0, 2);
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedCountry = '';
    this.selectedCity = '';
    this.applyFilters();
  }

  searchAssets(): void {
    this.filteredAssets = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (!this.showAllAssets) this.filteredAssets = this.filteredAssets.slice(0, 2);
  }

  toggleSeeAssets(): void {
    this.showAllAssets = !this.showAllAssets;
    this.searchAssets();
  }
}

















