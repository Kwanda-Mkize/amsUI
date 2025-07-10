import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterDownloadBarComponent } from './search-filter-download-bar.component';

describe('SearchFilterDownloadBarComponent', () => {
  let component: SearchFilterDownloadBarComponent;
  let fixture: ComponentFixture<SearchFilterDownloadBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterDownloadBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterDownloadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
