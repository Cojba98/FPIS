import { TestBed } from '@angular/core/testing';

import { NalepniceService } from './nalepnice.service';

describe('NalepniceService', () => {
  let service: NalepniceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NalepniceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
