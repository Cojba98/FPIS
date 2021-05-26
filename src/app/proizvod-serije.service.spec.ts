import { TestBed } from '@angular/core/testing';

import { ProizvodSerijeService } from './proizvod-serije.service';

describe('ProizvodSerijeService', () => {
  let service: ProizvodSerijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodSerijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
