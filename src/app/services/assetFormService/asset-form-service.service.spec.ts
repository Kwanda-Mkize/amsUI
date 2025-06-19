import { TestBed } from '@angular/core/testing';

import { AssetFormServiceService } from './asset-form-service.service';

describe('AssetFormServiceService', () => {
  let service: AssetFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
