import { TestBed } from '@angular/core/testing';

import { ComunidadService } from './comunidad.service';

describe('ComunidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunidadService = TestBed.get(ComunidadService);
    expect(service).toBeTruthy();
  });
});
