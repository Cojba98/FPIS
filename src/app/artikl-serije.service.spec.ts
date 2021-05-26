import { TestBed } from '@angular/core/testing';

import { ArtiklSerijeService } from './artikl-serije.service';

describe('ArtiklSerijeService', () => {
  let service: ArtiklSerijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtiklSerijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
