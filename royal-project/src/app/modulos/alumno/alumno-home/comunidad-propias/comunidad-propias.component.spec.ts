import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadPropiasComponent } from './comunidad-propias.component';

describe('ComunidadPropiasComponent', () => {
  let component: ComunidadPropiasComponent;
  let fixture: ComponentFixture<ComunidadPropiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunidadPropiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadPropiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
