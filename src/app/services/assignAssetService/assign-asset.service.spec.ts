import { TestBed } from '@angular/core/testing';

import { AssignAssetService } from './assign-asset.service';

describe('AssignAssetService', () => {
  let service: AssignAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
