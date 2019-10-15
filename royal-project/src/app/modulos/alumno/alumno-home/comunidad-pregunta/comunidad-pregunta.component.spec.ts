import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadPreguntaComponent } from './comunidad-pregunta.component';

describe('ComunidadPreguntaComponent', () => {
  let component: ComunidadPreguntaComponent;
  let fixture: ComponentFixture<ComunidadPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunidadPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
