import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadNuevoComponent } from './comunidad-nuevo.component';

describe('ComunidadNuevoComponent', () => {
  let component: ComunidadNuevoComponent;
  let fixture: ComponentFixture<ComunidadNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunidadNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
