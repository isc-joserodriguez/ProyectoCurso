import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroNuevoCursoComponent } from './maestro-nuevo-curso.component';

describe('MaestroNuevoCursoComponent', () => {
  let component: MaestroNuevoCursoComponent;
  let fixture: ComponentFixture<MaestroNuevoCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroNuevoCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroNuevoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
