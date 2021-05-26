import { TestBed } from '@angular/core/testing';

import { SerijaService } from './serija.service';

describe('SerijaService', () => {
  let service: SerijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
