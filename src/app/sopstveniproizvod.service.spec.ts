import { TestBed } from '@angular/core/testing';

import { SopstveniproizvodService } from './sopstveniproizvod.service';

describe('SopstveniproizvodService', () => {
  let service: SopstveniproizvodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SopstveniproizvodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
