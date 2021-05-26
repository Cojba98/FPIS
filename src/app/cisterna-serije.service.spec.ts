import { TestBed } from '@angular/core/testing';

import { CisternaSerijeService } from './cisterna-serije.service';

describe('CisternaSerijeService', () => {
  let service: CisternaSerijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CisternaSerijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
