import { TestBed } from '@angular/core/testing';

import { PlanoviService } from './planovi.service';

describe('PlanoviService', () => {
  let service: PlanoviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
