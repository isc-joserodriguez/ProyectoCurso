import { TestBed } from '@angular/core/testing';

import { DiarioService } from './diario.service';

describe('DiarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiarioService = TestBed.get(DiarioService);
    expect(service).toBeTruthy();
  });
});
