import { TestBed } from '@angular/core/testing';

import { MLPDataService } from './mlpdata.service';

describe('MLPDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MLPDataService = TestBed.get(MLPDataService);
    expect(service).toBeTruthy();
  });
});
