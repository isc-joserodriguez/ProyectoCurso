import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosYPrivacidadComponent } from './datos-y-privacidad.component';

describe('DatosYPrivacidadComponent', () => {
  let component: DatosYPrivacidadComponent;
  let fixture: ComponentFixture<DatosYPrivacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosYPrivacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosYPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
