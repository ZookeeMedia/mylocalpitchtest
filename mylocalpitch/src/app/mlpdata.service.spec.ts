import { TestBed } from '@angular/core/testing';

import { MlpdataService } from './mlpdata.service';

describe('MlpdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlpdataService = TestBed.get(MlpdataService);
    expect(service).toBeTruthy();
  });
});
