import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetComponent } from './add.asset.component';

describe('AddAssetComponent', () => {
  let component: AddAssetComponent;
  let fixture: ComponentFixture<AddAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
